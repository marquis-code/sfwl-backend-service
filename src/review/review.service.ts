// nest.js modules
import {
	Injectable,
	BadRequestException,
	NotFoundException,
	ForbiddenException,
	InternalServerErrorException
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model, Types } from "mongoose"
import { UserDocument } from "../user/user.schema"

// schema
import { Product, ProductDocument } from "../product/product.schema"
import { Review, ReviewDocument } from "./review.schema"
import { CacheService } from '../cache/cache.service';

// DTOs
import { CreateReviewDto, UpdateReviewDto } from "./review.dto"

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private readonly Review: Model<ReviewDocument>,

		@InjectModel(Product.name)
		private readonly Product: Model<ProductDocument>,
		private readonly cacheService: CacheService
	) {}

	// async getReviews() {
	// 	const reviews = await this.Review.find()
	// 		.populate({ path: "user", select: "id name" })
	// 		.populate({ path: "product", select: "id name" })

	// 	return { reviews }
	// }

	async getReviews() {
		try {
		  // Define a unique cache key for storing and retrieving reviews
		  const cacheKey = 'reviews';
	  
		  // Attempt to retrieve cached reviews from the cache service
		  const cachedReviews = await this.cacheService.get(cacheKey);
	  
		  if (cachedReviews) {
			// If cached reviews exist, parse the JSON and return it
			return { reviews: JSON.parse(cachedReviews), fromCache: true };
		  }
	  
		  // If no cached reviews are found, query the database for reviews
		  const reviews = await this.Review.find()
			.populate({ path: "user", select: "id name" })
			.populate({ path: "product", select: "id name" });
	  
		  // Cache the retrieved reviews for future use
		  await this.cacheService.set(cacheKey, JSON.stringify(reviews));
	  
		  // Return the reviews retrieved from the database
		  return { reviews, fromCache: false };
		} catch (error) {
		  // Handle any errors that occur during the process
		  throw new InternalServerErrorException('Something went wrong');
		}
	  }
	  

	async createReview(dto: CreateReviewDto, user: UserDocument) {
		let review = await this.Review.findOne({
			user: new Types.ObjectId(user.id),
			product: new Types.ObjectId(dto.product),
		})

		if (review)
			throw new BadRequestException([
				"A user can not create more than one review for a product",
			])

		review = await this.Review.create({
			...dto,
			product: new Types.ObjectId(dto.product),
			user: new Types.ObjectId(user.id),
		})

		await this.Product.findByIdAndUpdate(review.product, {
			averageRating: await this.getAverageRating(review.product),
		})

		await review.populate({ path: "user", select: "id name" })
		await review.populate({ path: "product", select: "id name" })

		return { review }
	}

	async updateReview(
		id: string,
		dto: UpdateReviewDto,
		currentUser: UserDocument,
	) {
		const review = await this.Review.findById(id)

		if (!review)
			throw new NotFoundException(["No review found with the entered ID"])

		if (currentUser.id !== review.user.toString())
			throw new ForbiddenException([
				"The current user can't access this resource",
			])

		review.title = dto.title
		review.text = dto.text
		review.rating = dto.rating

		await review.save()

		await this.Product.findByIdAndUpdate(review.product, {
			averageRating: await this.getAverageRating(review.product),
		})

		await review.populate({ path: "user", select: "id name" })
		await review.populate({ path: "product", select: "id name" })

		return { review }
	}

	async deleteReview(id: string, currentUser: UserDocument) {
		const review = await this.Review.findById(id)

		if (!review)
			throw new NotFoundException(["No review found with the entered ID"])

		if (currentUser.id !== review.user.toString())
			throw new ForbiddenException([
				"The current user can't access this resource",
			])

		await review.deleteOne()

		await this.Product.findByIdAndUpdate(review.product, {
			averageRating: await this.getAverageRating(review.product),
		})

		return {}
	}

	async getAverageRating(productId: Types.ObjectId) {
		const result = await this.Review.aggregate([
			{
				$match: { product: productId },
			},
			{
				$group: {
					_id: "$product",
					averageRating: { $avg: "$rating" },
				},
			},
		])

		if (result[0]) {
			return result[0].averageRating
		} else {
			return 0
		}
	}
}
