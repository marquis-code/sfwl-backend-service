import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  Patch,
  Sse,
  Query,
  MessageEvent
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "../auth/auth.decorator";
import { Role } from "../role/role.enum";
import { CreateOrderDto } from "./order.dto";
import { WalletService } from "../wallet/wallet.service";
import { Order } from "./order.schema";
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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

  @Sse('events')
  sendOrderEvents(): Observable<MessageEvent> {
    return this.orderService.getOrderEvents().pipe(
      map(order => ({
        data: order,
      })),
    );
  }
  // @Sse('events')
  // sendOrderEvents(@Query('location') location: string): Observable<MessageEvent> {
  //   const erranderLocation = location.split(',').map(Number) as any;

  //   return this.orderService.getOrderEvents().pipe(
  //     filter(order => this.isErranderWithinRadius(order.location.coordinates, erranderLocation)),
  //     map(order => this.createMessageEvent(order)),
  //   );
  // }

  private createMessageEvent(data: any): MessageEvent {
    return new MessageEvent('message', { data });
  }

  private isErranderWithinRadius(orderLocation: [number, number], erranderLocation: [number, number]): boolean {
    const [orderLongitude, orderLatitude] = orderLocation;
    const [erranderLongitude, erranderLatitude] = erranderLocation;

    const distance = this.calculateDistance(orderLongitude, orderLatitude, erranderLongitude, erranderLatitude);

    // 10cm in degrees is approximately 0.000001 (you can adjust this based on your needs)
    const radius = 20037.5;

    return distance <= radius;
  }

  private calculateDistance(lon1: number, lat1: number, lon2: number, lat2: number): number {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
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
