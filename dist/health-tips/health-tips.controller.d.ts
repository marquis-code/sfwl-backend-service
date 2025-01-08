import { HealthTipsService } from './health-tips.service';
import { CreateHealthTipDto } from './dtos/create-health-tips.dto';
import { UpdateHealthTipDto } from './dtos/update-health-tips.dto';
export declare class HealthTipsController {
    private readonly healthTipsService;
    constructor(healthTipsService: HealthTipsService);
    createHealthTip(createHealthTipDto: CreateHealthTipDto, req: any): Promise<{
        success: boolean;
        data: import("./schemas/health-tips.schema").HealthTips;
    }>;
    findAll(): Promise<import("./schemas/health-tips.schema").HealthTips[]>;
    findByDate(date: string): Promise<import("./schemas/health-tips.schema").HealthTips[]>;
    findOne(id: string): Promise<import("./schemas/health-tips.schema").HealthTips>;
    update(id: string, updateHealthTipDto: UpdateHealthTipDto): Promise<import("./schemas/health-tips.schema").HealthTips>;
    delete(id: string): Promise<void>;
}
