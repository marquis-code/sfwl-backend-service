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
import { HealthTip, HealthTipDocument } from './schemas/health-tip.schema';
import { CreateHealthTipDto } from './dtos/create-health-tip.dto';
import { UpdateHealthTipDto } from './dtos/update-health-tip.dto';
export declare class HealthTipsService implements OnModuleInit {
    private healthTipModel;
    constructor(healthTipModel: Model<HealthTipDocument>);
    create(createHealthTipDto: CreateHealthTipDto): Promise<HealthTip>;
    findAll(): Promise<HealthTip[]>;
    findOne(id: string): Promise<HealthTip>;
    update(id: string, updateHealthTipDto: UpdateHealthTipDto): Promise<HealthTip>;
    delete(id: string): Promise<void>;
    findByDate(date: string): Promise<HealthTip[]>;
    processTodayHealthTips(): Promise<void>;
    onModuleInit(): Promise<void>;
}
