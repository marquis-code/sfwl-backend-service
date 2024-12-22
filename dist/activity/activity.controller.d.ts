import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity;
    }>;
    findAll(): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity;
    }>;
    update(id: string, updateActivityDto: UpdateActivityDto): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
