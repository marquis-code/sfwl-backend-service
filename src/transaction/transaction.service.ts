// src/transactions/transaction.service.ts

import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
    private cacheService: CacheService
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = new this.transactionModel(createTransactionDto);
    return transaction.save();
  }

  // async findAll(): Promise<Transaction[]> {
  //   return this.transactionModel.find().exec();
  // }

  async findAll(): Promise<Transaction[]> {
    try {
      // Define a cache key for all transactions
      const cacheKey = 'transactions_all';
  
      // Attempt to retrieve cached transactions
      const cachedTransactions = await this.cacheService.get(cacheKey);
  
      if (cachedTransactions) {
        // If cached transactions exist, parse the JSON and return it
        return JSON.parse(cachedTransactions);
      }
  
      // If no cached transactions are found, query the database
      const transactions = await this.transactionModel.find().exec();
  
      // Cache the retrieved transactions for future use
      await this.cacheService.set(cacheKey, JSON.stringify(transactions));
  
      // Return the transactions retrieved from the database
      return transactions;
    } catch (error) {
      // Handle any errors that occur during the process
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  

  // async findOne(id: string): Promise<Transaction> {
  //   return this.transactionModel.findById(id).exec();
  // }

  async findOne(id: string): Promise<Transaction> {
    try {
      // Define a cache key for a specific transaction
      const cacheKey = `transaction_${id}`;
  
      // Attempt to retrieve the cached transaction
      const cachedTransaction = await this.cacheService.get(cacheKey);
  
      if (cachedTransaction) {
        // If the cached transaction exists, parse the JSON and return it
        return JSON.parse(cachedTransaction);
      }
  
      // If no cached transaction is found, query the database
      const transaction = await this.transactionModel.findById(id).exec();
  
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
  
      // Cache the retrieved transaction for future use
      await this.cacheService.set(cacheKey, JSON.stringify(transaction));
  
      // Return the transaction retrieved from the database
      return transaction;
    } catch (error) {
      // Handle any errors that occur during the process
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  

  async updateStatus(reference: string, status: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({ reference }).exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    transaction.status = status;
    return transaction.save();
  }
}
