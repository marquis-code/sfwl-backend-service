// src/transactions/transaction.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { CacheConfigModule } from '../cache/cache.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    forwardRef(() => CacheConfigModule), // Import CacheConfigModule
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
