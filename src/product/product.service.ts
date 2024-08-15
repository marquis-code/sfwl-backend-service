import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { Review, ReviewDocument } from "../review/review.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { ProductDto, UpdateProductDto, UpdateProductWithCreatedByDto } from "./product.dto";
import { User, UserDocument } from "../user/user.schema";
import { shuffleArray } from "../utils/shuffleArray";
import { Cache } from 'cache-manager';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,

    private readonly cloudinary: CloudinaryService,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    private readonly cacheService: CacheService
  ) {}

  async getProducts() {
    try {
      const cacheProducts = await this.cacheService.get('products')
      if(cacheProducts) {
        // Data found in cache, set fromCache to true
        const shuffledProducts = shuffleArray(cacheProducts);
        return { products: shuffledProducts, fromCache: true }
      }

      const products = await this.productModel.find().populate("createdBy");
      // Cache the data for future use
      await this.cacheService.set('products', JSON.stringify(products))

      const shuffledProducts = shuffleArray(products);

      return { products: shuffledProducts, fromCache: false };
    } catch (err: any) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getProduct(id: string) {
    try {
      // Attempt to retrieve the product from the cache using the product ID as the key
      const cacheProduct = await this.cacheService.get(`product_${id}`);
      if (cacheProduct) {
        let parsedProduct;
        // Check if the cached data is already an object
        if (typeof cacheProduct === 'string') {
          try {
            parsedProduct = JSON.parse(cacheProduct);
            console.log(parsedProduct, 'here ooo')
          } catch (parseError) {
            console.error('Error parsing cached product data:', parseError);
            // Handle parse error, fallback to fetching from DB
          }
        } else {
          // If it's already an object, just assign it directly
          parsedProduct = cacheProduct;
        }
  
        // If parsing was successful or the data was already an object
        if (parsedProduct) {
          return { product: parsedProduct, fromCache: true };
        }
      }
  
      // If not found in the cache or parsing fails, fetch the product from the database
      const product = await this.productModel.findById(id).populate("reviews");
  
      // If the product is not found, throw a NotFoundException
      if (!product) {
        throw new NotFoundException("No product found with the entered ID");
      }
  
      // Cache the product data for future use, converting it to a string
      await this.cacheService.set(`product_${id}`, JSON.stringify(product));
  
      // Return the product data with a flag indicating it's not from cache
      return { product, fromCache: false };
    } catch (err: any) {
      // Log the error for debugging purposes
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  

  async createProduct(dto: ProductDto, user: any, file: any) {
    const cloudinaryResponse = await this.cloudinary.uploadImage(file);
    const productPayload = {
      ...dto,
      createdBy: user._id,
      cloudinary_id: cloudinaryResponse.public_id,
      image: cloudinaryResponse.url,
    };

    const product = await this.productModel.create(productPayload);
    return { product };
  }
  
async updateProduct(
  id: string,
  dto: UpdateProductDto,
  userId: string,
  file?: any
) {
  try {
    // Find the product by ID
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException("No product found with the entered ID");
    }

    // Check if the user has permission to edit the product
    const userIdObj = new Types.ObjectId(userId);
    if (!product.createdBy.equals(userIdObj)) {
      throw new ForbiddenException("You can only edit your own products");
    }

    // Update product fields explicitly
    if (dto.name) product.name = dto.name;
    if (dto.description) product.description = dto.description;
    if (dto.price) product.price = dto.price;
    if (dto.currentInStock) product.currentInStock = dto.currentInStock;
    if (dto.category) product.category = dto.category;
    if (dto.productType) product.productType = dto.productType;
    if (dto.sizeList) product.sizeList = dto.sizeList;

    if (file) {
      // Delete old image from Cloudinary if exists
      if (product.cloudinary_id) {
        await this.cloudinary.deleteImage(product.cloudinary_id);
      }

      // Upload new image to Cloudinary
      const cloudinaryResponse = await this.cloudinary.uploadImage(file);
      product.cloudinary_id = cloudinaryResponse.public_id;
      product.image = cloudinaryResponse.url;
    }

    // Save the updated product in the database
    await product.save();

    // Find the updated product to return
    const updatedProduct = await this.productModel.findById(id);

    return { product: updatedProduct };

  } catch (error) {
    if (error instanceof NotFoundException || error instanceof ForbiddenException) {
      throw error;
    }
    throw new InternalServerErrorException("An error occurred while updating the product");
  }
}


  async deleteProduct(id: string, userId: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException("No product found with the entered ID");
    }

    const user = await this.userModel.findById(userId);
    if (!user || (user.role !== "vendor" && user.role !== "admin")) {
      throw new ForbiddenException(
        "Only vendors and admins can delete products"
      );
    }

    const userIdObj = new Types.ObjectId(userId);
    if (user.role === "vendor" && !product.createdBy.equals(userIdObj)) {
      throw new ForbiddenException(
        "Vendors can only delete their own products"
      );
    }

    // Delete product image from Cloudinary
    if (product.cloudinary_id) {
      await this.cloudinary.deleteImage(product.cloudinary_id);
    }

    await this.productModel.findByIdAndDelete(id);
    await this.reviewModel.deleteMany({ product: product._id });

    return {};
  }

  async getVendorProducts(vendorId: string): Promise<Product[]> {
    const objectId = new Types.ObjectId(vendorId);
    const products = await this.productModel.find({ createdBy: objectId }).exec();
  
    return products;
  }
}
