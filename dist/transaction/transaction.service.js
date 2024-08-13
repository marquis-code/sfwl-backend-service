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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./transaction.schema");
const cache_service_1 = require("../cache/cache.service");
let TransactionService = class TransactionService {
    constructor(transactionModel, cacheService) {
        this.transactionModel = transactionModel;
        this.cacheService = cacheService;
    }
    async create(createTransactionDto) {
        const transaction = new this.transactionModel(createTransactionDto);
        return transaction.save();
    }
    async findAll() {
        try {
            const cacheKey = 'transactions_all';
            const cachedTransactions = await this.cacheService.get(cacheKey);
            if (cachedTransactions) {
                return JSON.parse(cachedTransactions);
            }
            const transactions = await this.transactionModel.find().exec();
            await this.cacheService.set(cacheKey, JSON.stringify(transactions));
            return transactions;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async findOne(id) {
        try {
            const cacheKey = `transaction_${id}`;
            const cachedTransaction = await this.cacheService.get(cacheKey);
            if (cachedTransaction) {
                return JSON.parse(cachedTransaction);
            }
            const transaction = await this.transactionModel.findById(id).exec();
            if (!transaction) {
                throw new common_1.NotFoundException('Transaction not found');
            }
            await this.cacheService.set(cacheKey, JSON.stringify(transaction));
            return transaction;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async updateStatus(reference, status) {
        const transaction = await this.transactionModel.findOne({ reference }).exec();
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        transaction.status = status;
        return transaction.save();
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cache_service_1.CacheService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map