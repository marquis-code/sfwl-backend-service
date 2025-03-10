"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthTipsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const health_tips_service_1 = require("./health-tips.service");
const health_tips_controller_1 = require("./health-tips.controller");
const health_tips_schema_1 = require("./schemas/health-tips.schema");
let HealthTipsModule = class HealthTipsModule {
};
exports.HealthTipsModule = HealthTipsModule;
exports.HealthTipsModule = HealthTipsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: health_tips_schema_1.HealthTips.name, schema: health_tips_schema_1.HealthTipSchema }]),
        ],
        controllers: [health_tips_controller_1.HealthTipsController],
        providers: [health_tips_service_1.HealthTipsService],
    })
], HealthTipsModule);
//# sourceMappingURL=health-tips.module.js.map