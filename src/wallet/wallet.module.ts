import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './wallet.schema';
import { Order, OrderSchema } from '../order/order.schema';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
