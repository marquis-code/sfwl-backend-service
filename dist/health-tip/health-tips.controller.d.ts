import { HealthTipsService } from './health-tips.service';
import { CreateHealthTipDto } from './dtos/create-health-tip.dto';
import { UpdateHealthTipDto } from './dtos/update-health-tip.dto';
export declare class HealthTipsController {
    private readonly healthTipsService;
    constructor(healthTipsService: HealthTipsService);
    create(createHealthTipDto: CreateHealthTipDto): Promise<{
        success: boolean;
        data: import("./schemas/health-tip.schema").HealthTip;
    }>;
    findAll(): Promise<import("./schemas/health-tip.schema").HealthTip[]>;
    findByDate(date: string): Promise<import("./schemas/health-tip.schema").HealthTip[]>;
    findOne(id: string): Promise<import("./schemas/health-tip.schema").HealthTip>;
    update(id: string, updateHealthTipDto: UpdateHealthTipDto): Promise<import("./schemas/health-tip.schema").HealthTip>;
    delete(id: string): Promise<void>;
}
