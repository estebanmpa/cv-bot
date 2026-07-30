import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Message is too long. Maximum length is 100 characters.' })
  message!: string;

  @IsUUID()
  @IsNotEmpty()
  chatId!: string;
}
