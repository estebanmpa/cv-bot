import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class TelegramChatDto {
  @IsNumber()
  id!: number;
}

export class TelegramMessageDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramChatDto)
  chat?: TelegramChatDto;

  @IsOptional()
  @IsString()
  text?: string;
}

export class TelegramWebhookDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramMessageDto)
  message?: TelegramMessageDto;
}
