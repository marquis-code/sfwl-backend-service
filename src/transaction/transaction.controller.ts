// src/transactions/transaction.controller.ts

import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':reference')
  async updateStatus(@Param('reference') reference: string, @Body('status') status: string) {
    return this.transactionService.updateStatus(reference, status);
  }
}
