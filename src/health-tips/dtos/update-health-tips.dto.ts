import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthTipDto } from './create-health-tips.dto';

export class UpdateHealthTipDto extends PartialType(CreateHealthTipDto) {}
