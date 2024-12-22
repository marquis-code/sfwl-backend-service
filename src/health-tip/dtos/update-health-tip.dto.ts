import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthTipDto } from './create-health-tip.dto';

export class UpdateHealthTipDto extends PartialType(CreateHealthTipDto) {}
