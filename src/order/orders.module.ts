import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { OrderController } from "./order.controller"
import { Order, OrderSchema } from "./order.schema"
import { OrderService } from "./order.service"
import { UserModule } from "../user/user.module"
import { ReviewModule } from "../review/review.module"
import { ProductModule } from "../product/product.module"
import { NotificationModule } from '../notification/notification.module'; 
import { WalletModule } from "../wallet/wallet.module"
//REMEMBER TO INJECT THE NOTIFICATION SERVICE AND USER SERVICE TO AVOID CIRCULAR DEPENDENCY ISSUES

@Module({
	imports: [
		forwardRef(() => ProductModule),
		forwardRef(() => UserModule),
        forwardRef(() => ReviewModule),
        forwardRef(() => NotificationModule),
		forwardRef(() => WalletModule),
		MongooseModule.forFeature([
			{ name: Order.name, schema: OrderSchema },
		])
	],
	exports: [
		MongooseModule.forFeature([
			{ name: Order.name, schema: OrderSchema },
		]),
	],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {}
