import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto, req: any): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity;
    }>;
    findAll(req: any): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity[];
    }>;
    findAllUserActivities(userId: string, req: any): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity[];
    }>;
    findOne(id: string, req: any): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity;
    }>;
    update(id: string, updateActivityDto: UpdateActivityDto, req: any): Promise<{
        success: boolean;
        data: import("./schemas/activity.schema").Activity;
    }>;
    delete(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
