import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Order, OrderDocument } from "./order.schema";
import { Product, ProductDocument } from "../product/product.schema";
import { CreateOrderDto } from "./order.dto";
import { NotificationService } from "../notification/notification.service";
import { User, UserDocument } from "../user/user.schema";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly notificationService: NotificationService
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const items = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.productModel.findById(item.product);
        if (!product)
          throw new NotFoundException(`Product not found: ${item.product}`);
        if (product.currentInStock < item.quantity) {
          throw new BadRequestException(
            `Not enough stock available for product: ${item.product}`
          );
        }

        product.currentInStock -= item.quantity;
        await product.save();

        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new this.orderModel({
      items,
      user: dto.user,
      totalPrice,
      location: dto.location,
    });
    const savedOrder = await order.save();

    //  Notify nearby erranders
    await this.notifyNearbyErranders(savedOrder);

    return savedOrder;
  }

  async notifyNearbyErranders(order: any) {
    if (!order.location || !order.location.coordinates) {
      throw new BadRequestException("Order location is required.");
    }
    let erranders = await this.userModel.find({
      role: "errander",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: order?.location?.coordinates,
          },
          $maxDistance: 10000, // 10 km
        },
      },
    });

    if (erranders.length === 0) {
      // If no erranders found nearby, notify all erranders
      erranders = await this.userModel.find({
        role: 'errander',
      });
      // throw new NotFoundException("No Errander was found to pickup your order.");
    }

    const notificationMessage = `A new order has been placed${erranders.length === 0 ? '' : ' nearby'}.`;

    if (erranders.length) {
      for (const errander of erranders) {
        await this.notificationService.sendNotification(
          errander._id,
          "New Order Available",
          notificationMessage,
          { orderId: order._id, orderDetails: order }
        );
      }
    }
  }

  async acceptOrder(orderId: string, erranderId: string): Promise<void> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException("Order not found");

    // Notify the user who made the order
    const user = await this.userModel.findById(order.user);
    if (user) {
      await this.notificationService.sendNotification(
        user._id,
        "Order Accepted",
        `Your order has been accepted by an errander.`,
        { orderId: order._id }
      );
    }
  }

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().populate("items.product").exec();
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) throw new NotFoundException("Order not found");

    await Promise.all(
      order.items.map(async (item) => {
        const product = await this.productModel.findById(item.product);
        if (product) {
          product.currentInStock += item.quantity;
          await product.save();
        }
      })
    );
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const objectId = new Types.ObjectId(userId);
    return this.orderModel.find({ user: objectId }).exec();
  }
}
