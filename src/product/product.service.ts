import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { Review, ReviewDocument } from "../review/review.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { ProductDto, UpdateProductDto } from "./product.dto";
import { User, UserDocument } from "../user/user.schema";

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
    const products = await this.productModel.find();
    return { products };
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

  async updateProduct(id: string, dto: UpdateProductDto, userId: string, file?: any) {
    console.log(userId, 'usr id here')
    let updateData = { ...dto };

    if (file) {
      const product = await this.productModel.findById(id);
      console.log(product, 'usr id here')
      if (!product) {
        throw new NotFoundException("No product found with the entered ID");
      }

      // if (product.createdBy.toString() !== userId) {
      //   throw new ForbiddenException('You can only edit your own products');
      // }

      const userIdObj = new Types.ObjectId(userId);

      // Check if the user has permission to edit the product
      if (!product.createdBy.equals(userIdObj)) {
        throw new ForbiddenException('You can only edit your own products');
      }

      // Delete old image from Cloudinary
      if (product.cloudinary_id) {
        await this.cloudinary.deleteImage(product.cloudinary_id);
      }

      // Upload new image to Cloudinary
      const cloudinaryResponse = await this.cloudinary.uploadImage(file);
      updateData = {
        ...updateData,
        cloudinary_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.url,
      };
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateData, {
      runValidators: true,
      new: true,
    });

    if (!updatedProduct) {
      throw new NotFoundException("No product found with the entered ID");
    }

    return { product: updatedProduct };
  }
  
async deleteProduct(id: string, userId: string) {
  console.log(userId, 'userId ggggggg');
  const product = await this.productModel.findById(id);
  console.log(product, 'deletersssssss her eooo');
  if (!product) {
    throw new NotFoundException("No product found with the entered ID");
  }

  const user = await this.userModel.findById(userId);
  console.log(user, 'deleter her eooo');
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
    return this.productModel.find({ createdBy: objectId }).exec();
  }
}
