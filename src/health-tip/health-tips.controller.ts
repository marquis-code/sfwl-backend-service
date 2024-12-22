import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Query,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HealthTipsService } from './health-tips.service';
  import { CreateHealthTipDto } from './dtos/create-health-tip.dto';
  import { UpdateHealthTipDto } from './dtos/update-health-tip.dto';
  
  @Controller('health-tips')
  export class HealthTipsController {
    constructor(private readonly healthTipsService: HealthTipsService) {}
  
    @Post()
    async create(@Body() createHealthTipDto: CreateHealthTipDto) {
      try {
        const healthTip = await this.healthTipsService.create(createHealthTipDto);
        return { success: true, data: healthTip };
      } catch (error) {
        throw new HttpException(
          'Error creating health tip',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Get()
    async findAll() {
      return this.healthTipsService.findAll();
    }
  
    @Get('by-date')
    async findByDate(@Query('date') date: string) {
      if (!date) {
        throw new HttpException('Date is required', HttpStatus.BAD_REQUEST);
      }
      return this.healthTipsService.findByDate(date);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.healthTipsService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateHealthTipDto: UpdateHealthTipDto,
    ) {
      return this.healthTipsService.update(id, updateHealthTipDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.healthTipsService.delete(id);
    }
  }
  