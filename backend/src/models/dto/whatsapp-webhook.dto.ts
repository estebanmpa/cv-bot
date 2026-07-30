import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class WhatsappTextDto {
  @IsString()
  body!: string;
}

export class WhatsappMessageDto {
  @IsString()
  from!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsappTextDto)
  text?: WhatsappTextDto;
}

export class WhatsappValueDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappMessageDto)
  messages?: WhatsappMessageDto[];
}

export class WhatsappChangeDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsappValueDto)
  value?: WhatsappValueDto;
}

export class WhatsappEntryDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappChangeDto)
  changes?: WhatsappChangeDto[];
}

export class WhatsappWebhookDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappEntryDto)
  entry?: WhatsappEntryDto[];
}
