import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { UserService } from 'src/user/user.service';

@Controller('message')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  @Post('send')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    const sender = +sendMessageDto.senderId;
    const receiver = +sendMessageDto.receiverId;

    const isReceiverExists = await this.userService.checkUserExistence(receiver);
    if(!isReceiverExists) throw new HttpException("You are trying to send a message to non-existent user", 500);

    const content = sendMessageDto.content;
    if(!content) return;

    const conversation = await this.conversationService.getConversation(sender, receiver);
    return this.messageService.create(conversation.id, sender, content);
  }
}
