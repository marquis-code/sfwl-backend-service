import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';
export declare class TransactionService {
    private readonly transactionModel;
    constructor(transactionModel: Model<Transaction>);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
    updateStatus(reference: string, status: string): Promise<Transaction>;
}
