import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "../auth/auth.decorator";
import { Role } from "../role/role.enum";
import { CreateOrderDto } from "./order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  @Auth(Role.Admin)
  async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const orderPayload = {
        ...createOrderDto,
        user: req.user._id
    }
    return this.orderService.createOrder(orderPayload);
  }

  @Delete(":id")
  async deleteOrder(@Param("id") id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Get('/user-orders')
  @Auth(Role.Admin, Role.Vendor)
  async getUserOrders(@Req() req) {
    const userId = req.user._id
    return this.orderService.getUserOrders(userId);
  }

  @Post(':id/accept')
  @Auth(Role.Admin, Role.Errander)
  async acceptOrder(@Param('id') orderId: string, @Req() req) {
    const user = req.user as any;
    await this.orderService.acceptOrder(orderId, user._id);
  }
}
