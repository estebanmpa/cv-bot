import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Message is too long. Maximum length is 100 characters.' })
  message!: string;
}
