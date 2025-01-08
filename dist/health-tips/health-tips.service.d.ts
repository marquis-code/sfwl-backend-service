/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { HealthTips, HealthTipsDocument } from './schemas/health-tips.schema';
import { CreateHealthTipDto } from './dtos/create-health-tips.dto';
import { UpdateHealthTipDto } from './dtos/update-health-tips.dto';
export declare class HealthTipsService implements OnModuleInit {
    private healthTipModel;
    constructor(healthTipModel: Model<HealthTipsDocument>);
    create(createHealthTipDto: CreateHealthTipDto): Promise<HealthTips>;
    findAll(): Promise<HealthTips[]>;
    findOne(id: string): Promise<HealthTips>;
    update(id: string, updateHealthTipDto: UpdateHealthTipDto): Promise<HealthTips>;
    delete(id: string): Promise<void>;
    findByDate(date: string): Promise<HealthTips[]>;
    processTodayHealthTips(): Promise<void>;
    onModuleInit(): Promise<void>;
}
