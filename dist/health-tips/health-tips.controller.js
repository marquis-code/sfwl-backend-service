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
exports.HealthTipsController = void 0;
const common_1 = require("@nestjs/common");
const health_tips_service_1 = require("./health-tips.service");
const create_health_tips_dto_1 = require("./dtos/create-health-tips.dto");
const update_health_tips_dto_1 = require("./dtos/update-health-tips.dto");
let HealthTipsController = class HealthTipsController {
    constructor(healthTipsService) {
        this.healthTipsService = healthTipsService;
    }
    async createHealthTip(createHealthTipDto, req) {
        try {
            const healthTip = await this.healthTipsService.create(createHealthTipDto);
            return { success: true, data: healthTip };
        }
        catch (error) {
            throw new common_1.HttpException('Error creating health tip', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        return this.healthTipsService.findAll();
    }
    async findByDate(date) {
        if (!date) {
            throw new common_1.HttpException('Date is required', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.healthTipsService.findByDate(date);
    }
    async findOne(id) {
        return this.healthTipsService.findOne(id);
    }
    async update(id, updateHealthTipDto) {
        return this.healthTipsService.update(id, updateHealthTipDto);
    }
    async delete(id) {
        return this.healthTipsService.delete(id);
    }
};
exports.HealthTipsController = HealthTipsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_health_tips_dto_1.CreateHealthTipDto, Object]),
    __metadata("design:returntype", Promise)
], HealthTipsController.prototype, "createHealthTip", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthTipsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-date'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthTipsController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthTipsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_health_tips_dto_1.UpdateHealthTipDto]),
    __metadata("design:returntype", Promise)
], HealthTipsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthTipsController.prototype, "delete", null);
exports.HealthTipsController = HealthTipsController = __decorate([
    (0, common_1.Controller)('health-tips'),
    __metadata("design:paramtypes", [health_tips_service_1.HealthTipsService])
], HealthTipsController);
//# sourceMappingURL=health-tips.controller.js.map