import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(createServiceDto: CreateServiceDto): Promise<import("./service.schema").Service>;
    findAll(): Promise<import("./service.schema").Service[]>;
    findOne(id: string): Promise<import("./service.schema").Service>;
    remove(id: string): Promise<void>;
}
