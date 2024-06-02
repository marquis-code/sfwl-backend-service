import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./transaction.schema").Transaction>;
    findAll(): Promise<import("./transaction.schema").Transaction[]>;
    findOne(id: string): Promise<import("./transaction.schema").Transaction>;
    updateStatus(reference: string, status: string): Promise<import("./transaction.schema").Transaction>;
}
