import { Controller, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";

@Controller("services")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.serviceService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.serviceService.remove(id);
  }
}
