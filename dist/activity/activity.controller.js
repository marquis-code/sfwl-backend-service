"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const activity_service_1 = require("./activity.service");
const create_activity_dto_1 = require("./dto/create-activity.dto");
const update_activity_dto_1 = require("./dto/update-activity.dto");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    async create(createActivityDto, req) {
        try {
            const activity = await this.activityService.create(createActivityDto, req.user.id);
            return { success: true, data: activity };
        }
        catch (error) {
            throw new common_1.HttpException('Error creating activity', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(req) {
        try {
            const activities = await this.activityService.findAll(req.user.id);
            return { success: true, data: activities };
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching activities', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllUserActivities(userId, req) {
        try {
            if (!userId) {
                throw new common_1.HttpException('User ID is required to fetch activities', common_1.HttpStatus.BAD_REQUEST);
            }
            const activities = await this.activityService.findByUserId(userId);
            return { success: true, data: activities };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error fetching activities', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id, req) {
        try {
            const activity = await this.activityService.findOne(id, req.user.id);
            return { success: true, data: activity };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error fetching activity', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async update(id, updateActivityDto, req) {
        try {
            const updatedActivity = await this.activityService.update(id, updateActivityDto, req.user.id);
            return { success: true, data: updatedActivity };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error updating activity', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async delete(id, req) {
        try {
            await this.activityService.delete(id, req.user.id);
            return { success: true, message: 'Activity deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error deleting activity', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_activity_dto_1.CreateActivityDto, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "findAllUserActivities", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_activity_dto_1.UpdateActivityDto, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "delete", null);
exports.ActivityController = ActivityController = __decorate([
    (0, common_1.Controller)('activities'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map