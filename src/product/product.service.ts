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

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,

    private readonly cloudinary: CloudinaryService,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async getProducts() {
    // Populate the createdBy field to get the full user object
    const products = await this.productModel.find().populate("createdBy");

    // Shuffle the products array
    const shuffledProducts = shuffleArray(products);

    return { products: shuffledProducts };
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id).populate("reviews");

    if (!product) {
      throw new NotFoundException("No product found with the entered ID");
    }

    return { product };
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

    console.log('Updated Product:', updatedProduct);  // Log the updated product

    return { product: updatedProduct };

  } catch (error) {
    if (error instanceof NotFoundException || error instanceof ForbiddenException) {
      throw error;
    }
    console.error('Error updating product:', error);
    throw new InternalServerErrorException("An error occurred while updating the product");
  }
}


  async deleteProduct(id: string, userId: string) {
    console.log(userId, "userId ggggggg");
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException("No product found with the entered ID");
    }

    const user = await this.userModel.findById(userId);
    console.log(user, "deleter her eooo");
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
  
    console.log(`Fetched Products for Vendor ID ${vendorId}:`, products);  // Log the fetched products
  
    return products;
  }
}
