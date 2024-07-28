import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  Patch
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "../auth/auth.decorator";
import { Role } from "../role/role.enum";
import { CreateOrderDto } from "./order.dto";
import { WalletService } from "../wallet/wallet.service";
import { Order } from "./order.schema";

@Controller("orders")
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly walletService: WalletService
  ) {}

  @Get()
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  @Auth(Role.Admin, Role.Vendor, Role.Errander, Role.User)
  async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const orderPayload = {
      ...createOrderDto,   
      user: req.user._id,
    };
    return this.orderService.createOrder(orderPayload);
  }

  @Delete(":id")
  async deleteOrder(@Param("id") id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Get("/user-orders")
  @Auth(Role.Admin, Role.Vendor, Role.User, Role.Errander)
  async getUserOrders(@Req() req) {
    const userId = req.user._id;
    return this.orderService.getUserOrders(userId);
  }

  @Post(":id/accept")
  @Auth(Role.Admin, Role.Errander)
  async acceptOrder(@Param("id") orderId: string, @Req() req, @Body('erranderId') erranderId: string) {
    const user = req.user as any;
    await this.walletService.acceptOrder(orderId, erranderId);
    await this.orderService.acceptOrder(orderId, user._id);
    return { message: 'Order accepted by errander.' };
  }

  @Post(':id/complete')
  async completeOrder(@Param('id') id: string) {
    await this.walletService.handleOrderCompletion(id);
    return { message: 'Order completed and wallets credited.' };
  }

  @Patch(':id/deliver')
  async deliverOrder(@Param('id') id: string) {
    await this.walletService.markOrderAsDelivered(id);
    return { message: 'Order marked as delivered and wallets credited.' };
  }

  @Get('vendor/:vendorId/transactions')
  async getTransactionsForVendor(@Param('vendorId') vendorId: string): Promise<Order[]> {
    return this.walletService.getTransactionsForVendor(vendorId);
  }

  @Get('errander/:erranderId/orders')
  async getOrdersForErrander(@Param('erranderId') erranderId: string): Promise<Order[]> {
    return this.walletService.getOrdersForErrander(erranderId);
  }


  @Get('vendor') //Get all orders associated with a vendor
  @Auth(Role.Admin, Role.Vendor)
  async getOrdersByVendor(@Req() req): Promise<Order[]> {
    const vendorId = req.user._id
    return this.orderService.getOrdersByVendor(vendorId);
  }
}                                                                                                                 
