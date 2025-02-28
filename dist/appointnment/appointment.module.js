"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const appointment_schema_1 = require("./appointment.schema");
const service_schema_1 = require("../service/service.schema");
const appointment_service_1 = require("./appointment.service");
const service_service_1 = require("../service/service.service");
const appointment_controller_1 = require("./appointment.controller");
const service_controller_1 = require("../service/service.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: appointment_schema_1.Appointment.name, schema: appointment_schema_1.AppointmentSchema },
                { name: service_schema_1.Service.name, schema: service_schema_1.ServiceSchema },
            ]),
        ],
        controllers: [appointment_controller_1.AppointmentController, service_controller_1.ServiceController],
        providers: [appointment_service_1.AppointmentService, service_service_1.ServiceService],
    })
], AppModule);
//# sourceMappingURL=appointment.module.js.map