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
  

  // async updateProduct(
  //   id: string,
  //   dto: UpdateProductDto,
  //   userId: string,
  //   file?: any
  // ) {
  //   let updateData = { ...dto };

  //   // Find the product by ID
  //   const product = await this.productModel.findById(id);
  //   if (!product) {
  //     throw new NotFoundException("No product found with the entered ID");
  //   }

  //   // Check if the user has permission to edit the product
  //   const userIdObj = new Types.ObjectId(userId);
  //   if (!product.createdBy.equals(userIdObj)) {
  //     throw new ForbiddenException("You can only edit your own products");
  //   }

  //   if (file) {
  //     // Delete old image from Cloudinary if exists
  //     if (product.cloudinary_id) {
  //       await this.cloudinary.deleteImage(product.cloudinary_id);
  //     }

  //     // Upload new image to Cloudinary
  //     const cloudinaryResponse = await this.cloudinary.uploadImage(file);
  //     updateData = {
  //       ...updateData,
  //       cloudinary_id: cloudinaryResponse.public_id,
  //       image: cloudinaryResponse.url,
  //     };
  //   }

  //   // Update the product in the database
  //   const updatedProduct = await this.productModel.findByIdAndUpdate(
  //     id,
  //     updateData,
  //     {
  //       runValidators: true,
  //       new: true,
  //     }
  //   );

  //   if (!updatedProduct) {
  //     throw new NotFoundException("No product found with the entered ID");
  //   }

  //   return { product: updatedProduct };
  // }

  // async updateProduct(
  //   id: string,
  //   dto: UpdateProductDto,
  //   userId: string,
  //   file?: any
  // ) {
  //   let updateData = { ...dto };
  
  //   // Find the product by ID
  //   const product = await this.productModel.findById(id);
  //   if (!product) {
  //     throw new NotFoundException("No product found with the entered ID");
  //   }
  
  //   // Check if the user has permission to edit the product
  //   const userIdObj = new Types.ObjectId(userId);
  //   if (!product.createdBy.equals(userIdObj)) {
  //     throw new ForbiddenException("You can only edit your own products");
  //   }
  
  //   if (file) {
  //     // Delete old image from Cloudinary if exists
  //     if (product.cloudinary_id) {
  //       await this.cloudinary.deleteImage(product.cloudinary_id);
  //     }
  
  //     // Upload new image to Cloudinary
  //     const cloudinaryResponse = await this.cloudinary.uploadImage(file);
  //     updateData = {
  //       ...updateData,
  //       cloudinary_id: cloudinaryResponse.public_id,
  //       image: cloudinaryResponse.url,
  //     };
  //   }
  
  //   // Update the product in the database
  //   const updatedProduct = await this.productModel.findByIdAndUpdate(
  //     id,
  //     updateData,
  //     {
  //       runValidators: true,
  //       new: true,
  //     }
  //   );
  
  //   if (!updatedProduct) {
  //     throw new NotFoundException("Failed to update the product. No product found with the entered ID.");
  //   }
  
  //   return { product: updatedProduct };
  //  }
  

  // async updateProduct(
  //   id: string,
  //   dto: UpdateProductDto,
  //   userId: string,
  //   file?: any
  // ) {
  //   try {
  //     let updateData = { ...dto };
  
  //     // Find the product by ID
  //     const product = await this.productModel.findById(id);
  //     if (!product) {
  //       throw new NotFoundException("No product found with the entered ID");
  //     }
  
  //     // Check if the user has permission to edit the product
  //     const userIdObj = new Types.ObjectId(userId);
  //     if (!product.createdBy.equals(userIdObj)) {
  //       throw new ForbiddenException("You can only edit your own products");
  //     }
  
  //     if (file) {
  //       // Delete old image from Cloudinary if exists
  //       if (product.cloudinary_id) {
  //         await this.cloudinary.deleteImage(product.cloudinary_id);
  //       }
  
  //       // Upload new image to Cloudinary
  //       const cloudinaryResponse = await this.cloudinary.uploadImage(file);
  //       updateData = {
  //         ...updateData,
  //         cloudinary_id: cloudinaryResponse.public_id,
  //         image: cloudinaryResponse.url,
  //       };
  //     }
  
  //     // Update the product in the database
  //     const updatedProduct = await this.productModel.findByIdAndUpdate(
  //       id,
  //       updateData,
  //       {
  //         runValidators: true,
  //         new: true,
  //       }
  //     );
  
  //     if (!updatedProduct) {
  //       throw new NotFoundException("Failed to update the product. No product found with the entered ID.");
  //     }
  
  //     console.log('Updated Product:', updatedProduct);  // Log the updated product
  
  //     return { product: updatedProduct };
  
  //   } catch (error) {
  //     if (error instanceof NotFoundException || error instanceof ForbiddenException) {
  //       throw error;
  //     }
  //     console.error('Error updating product:', error);
  //     throw new InternalServerErrorException("An error occurred while updating the product");
  //   }
  // }

  // async updateProduct(
  //   id: string,
  //   dto: UpdateProductDto,
  //   userId: string,
  //   file?: any
  // ) {
  //   try {
  //     let updateData = { ...dto };
  
  //     // Find the product by ID
  //     const product = await this.productModel.findById(id);
  //     if (!product) {
  //       throw new NotFoundException("No product found with the entered ID");
  //     }
  
  //     // Check if the user has permission to edit the product
  //     const userIdObj = new Types.ObjectId(userId);
  //     if (!product.createdBy.equals(userIdObj)) {
  //       throw new ForbiddenException("You can only edit your own products");
  //     }
  
  //     if (file) {
  //       // Delete old image from Cloudinary if exists
  //       if (product.cloudinary_id) {
  //         await this.cloudinary.deleteImage(product.cloudinary_id);
  //       }
  
  //       // Upload new image to Cloudinary
  //       const cloudinaryResponse = await this.cloudinary.uploadImage(file);
  //       updateData = {
  //         ...updateData,
  //         cloudinary_id: cloudinaryResponse.public_id,
  //         image: cloudinaryResponse.url,
  //       };
  //     }
  
  //     // Preserve the createdBy field
  //     updateData.createdBy = product.createdBy;
  
  //     // Update the product in the database
  //     const updatedProduct = await this.productModel.findByIdAndUpdate(
  //       id,
  //       updateData,
  //       {
  //         runValidators: true,
  //         new: true,
  //       }
  //     );
  
  //     if (!updatedProduct) {
  //       throw new NotFoundException("Failed to update the product. No product found with the entered ID.");
  //     }
  
  //     console.log('Updated Product:', updatedProduct);  // Log the updated product
  
  //     return { product: updatedProduct };
  
  //   } catch (error) {
  //     if (error instanceof NotFoundException || error instanceof ForbiddenException) {
  //       throw error;
  //     }
  //     console.error('Error updating product:', error);
  //     throw new InternalServerErrorException("An error occurred while updating the product");
  //   }
  // }

// async updateProduct(
//   id: string,
//   dto: UpdateProductDto,
//   userId: string,
//   file?: any
// ) {
//   try {
//     // Find the product by ID
//     const product = await this.productModel.findById(id);
//     if (!product) {
//       throw new NotFoundException("No product found with the entered ID");
//     }

//     // Check if the user has permission to edit the product
//     const userIdObj = new Types.ObjectId(userId);
//     if (!product.createdBy.equals(userIdObj)) {
//       throw new ForbiddenException("You can only edit your own products");
//     }

//     // Create updateData object and ensure createdBy is preserved
//     // let updateData: UpdateProductWithCreatedByDto = { ...dto, createdBy: product.createdBy };
//     let updateData: UpdateProductWithCreatedByDto = { ...dto, createdBy: product.createdBy.toString() };

//     if (file) {
//       // Delete old image from Cloudinary if exists
//       if (product.cloudinary_id) {
//         await this.cloudinary.deleteImage(product.cloudinary_id);
//       }

//       // Upload new image to Cloudinary
//       const cloudinaryResponse = await this.cloudinary.uploadImage(file);
//       updateData = {
//         ...updateData,
//         cloudinary_id: cloudinaryResponse.public_id,
//         image: cloudinaryResponse.url,
//       };
//     }

//     // Update the product in the database
//     const updatedProduct = await this.productModel.findByIdAndUpdate(
//       id,
//       updateData,
//       {
//         runValidators: true,
//         new: true,
//       }
//     );

//     if (!updatedProduct) {
//       throw new NotFoundException("Failed to update the product. No product found with the entered ID.");
//     }

//     console.log('Updated Product:', updatedProduct);  // Log the updated product

//     return { product: updatedProduct };

//   } catch (error) {
//     if (error instanceof NotFoundException || error instanceof ForbiddenException) {
//       throw error;
//     }
//     console.error('Error updating product:', error);
//     throw new InternalServerErrorException("An error occurred while updating the product");
//   }
// }

async updateProduct(
  id: string,
  dto: UpdateProductDto,
  userId: string,
  file?: any
) {
  try {
    // Find the product by ID
    const product = await this.productModel.findById({ _id: id});
    if (!product) {
      throw new NotFoundException("No product found with the entered ID");
    }

    // Check if the user has permission to edit the product
    const userIdObj = new Types.ObjectId(userId);
    if (!product.createdBy.equals(userIdObj)) {
      throw new ForbiddenException("You can only edit your own products");
    }

    // Update product fields
    product.name = dto.name ?? product.name;
    product.description = dto.description ?? product.description;
    product.price = dto.price ?? product.price;
    product.currentInStock = dto.currentInStock ?? product.currentInStock;
    product.category = dto.category ?? product.category;
    product.cloudinary_id = dto.cloudinary_id ?? product.cloudinary_id;
    product.image = dto.image ?? product.image;
    // Preserve the createdBy field
    product.createdBy = product.createdBy;

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
    const updatedProduct = await product.save();

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
