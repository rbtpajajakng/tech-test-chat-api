import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class SendMessageDto {
  @IsNumber()
  @Type(() => Number)
  senderId: number;
  
  @IsNumber()
  @Type(() => Number)
  receiverId: number;

  content: string;
}
