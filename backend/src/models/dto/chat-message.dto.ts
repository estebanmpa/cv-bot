import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Message is too long. Maximum length is 50 characters.' })
  message!: string;
}
