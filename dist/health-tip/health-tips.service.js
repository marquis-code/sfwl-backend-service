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
exports.HealthTipsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const health_tip_schema_1 = require("./schemas/health-tip.schema");
let HealthTipsService = class HealthTipsService {
    constructor(healthTipModel) {
        this.healthTipModel = healthTipModel;
    }
    async create(createHealthTipDto) {
        const healthTip = new this.healthTipModel(createHealthTipDto);
        return healthTip.save();
    }
    async findAll() {
        return this.healthTipModel.find().exec();
    }
    async findOne(id) {
        const healthTip = await this.healthTipModel.findById(id).exec();
        if (!healthTip) {
            throw new common_1.NotFoundException(`Health Tip with ID ${id} not found`);
        }
        return healthTip;
    }
    async update(id, updateHealthTipDto) {
        const updatedHealthTip = await this.healthTipModel
            .findByIdAndUpdate(id, updateHealthTipDto, { new: true })
            .exec();
        if (!updatedHealthTip) {
            throw new common_1.NotFoundException(`Health Tip with ID ${id} not found`);
        }
        return updatedHealthTip;
    }
    async delete(id) {
        const result = await this.healthTipModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Health Tip with ID ${id} not found`);
        }
    }
    async findByDate(date) {
        return this.healthTipModel.find({ scheduleDate: date }).exec();
    }
    async processTodayHealthTips() {
        const today = new Date().toISOString().split('T')[0];
        const tips = await this.findByDate(today);
        if (tips.length) {
            console.log(`Today's Health Tips:`, tips);
        }
    }
    async onModuleInit() {
        const allTips = await this.findAll();
        console.log(`Loaded Health Tips for Scheduling:`, allTips);
    }
};
exports.HealthTipsService = HealthTipsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthTipsService.prototype, "processTodayHealthTips", null);
exports.HealthTipsService = HealthTipsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(health_tip_schema_1.HealthTip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HealthTipsService);
//# sourceMappingURL=health-tips.service.js.map