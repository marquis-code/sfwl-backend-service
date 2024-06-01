import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model,Connection, ClientSession } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.schema';
import { Order, OrderDocument } from '../order/order.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}


  // async createWallet(userId: any): Promise<void> {
  //   console.log('git it', userId)
  //   const newWallet = new this.walletModel({ userId, balance: 0 });
  //  const response = await newWallet.save();
  //  return response
  // }

  async createWallet(userId: string): Promise<string> {
    console.log('Creating wallet for user:', userId);
    const newWallet = new this.walletModel({ userId, balance: 0 });
    const savedWallet = await newWallet.save();
    return savedWallet._id.toString(); // Return the wallet ID
  }

  async creditWallet(userId: string, amount: number): Promise<void> {
    await this.walletModel.updateOne({ userId }, { $inc: { balance: amount } });
  }

  // async handleOrderCompletion(orderId: string): Promise<void> {
  //   const order = await this.orderModel.findById(orderId).exec();
  //   if (order && order.status === 'delivered') {
  //     const erranderShare = order.erranderId ? order.totalPrice * 0.05 : 0;

  //     if (erranderShare > 0) {
  //       await this.creditWallet(order.erranderId, erranderShare);
  //     }

  //     for (const item of order.items) {
  //       const vendorShare = item.price * 0.95;
  //       await this.creditWallet(item.vendorId, vendorShare);
  //     }
  //   }
  // }

  async handleOrderCompletion(orderId: string): Promise<void> {
    const session: ClientSession = await this.connection.startSession();
    session.startTransaction();

    try {
      const order = await this.orderModel.findById(orderId).exec();
      if (order && order.status === 'delivered') {
        // const erranderShare = order.totalPrice * 0.05;
        const erranderShare = order.erranderId ? order.totalPrice * 0.05 : 0;

        if (erranderShare > 0) {
          await this.walletModel.updateOne(
            { userId: order.erranderId },
            { $inc: { balance: erranderShare } },
            { session }
          );
        }

        for (const item of order.items) {
          const vendorShare = item.price * 0.95;
          await this.walletModel.updateOne(
            { userId: item.vendorId },
            { $inc: { balance: vendorShare } },
            { session }
          );
        }
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async acceptOrder(orderId: string, erranderId: string): Promise<void> {
    await this.orderModel.updateOne({ _id: orderId }, { $set: { erranderId, status: 'accepted' } });
  }

  async markOrderAsDelivered(orderId: string): Promise<void> {
    await this.orderModel.updateOne({ _id: orderId }, { $set: { status: 'delivered' } });
    await this.handleOrderCompletion(orderId);
  }

  async getTransactionsForVendor(vendorId: string): Promise<Order[]> {
    return this.orderModel.find({ 'items.vendorId': vendorId, status: 'delivered' }).exec();
  }

  async getOrdersForErrander(erranderId: string): Promise<Order[]> {
    return this.orderModel.find({ erranderId }).exec();
  }
}