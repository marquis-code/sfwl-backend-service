import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ReviewModule } from "../review/review.module"

import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { User, UserSchema } from "./user.schema"
import { Product, ProductSchema } from '../product/product.schema';
import { WalletModule } from "../wallet/wallet.module"

@Module({
	imports: [
		forwardRef(() => ReviewModule),
		WalletModule,
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }, 
			{ name: Product.name, schema: ProductSchema }
		]),
	],
	exports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
