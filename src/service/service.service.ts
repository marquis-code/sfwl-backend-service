import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Service, ServiceDocument } from "./schemas/service.schema";
import { CreateServiceDto } from "./dto/create-service.dto";

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = new this.serviceModel(createServiceDto);
    return service.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new NotFoundException("Service not found");
    }
    return service;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException("Service not found");
    }
  }
}
