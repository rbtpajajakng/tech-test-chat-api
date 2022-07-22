import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService
  ) {}

  @Get('list')
  async listUserConversation (
    @Query('userId', ParseIntPipe) userId: number
  ) {
    const conversationList = await this.conversationService.listAllUserConversation(userId);
    const data = [];
    if (conversationList.length < 1) return data;
    for (const conversation of conversationList) {
      const tempObject = {
        id: conversation.id,
        conversationPartner: '',
        lastMessage: '',
        unread: 0
      }
      tempObject.conversationPartner = await this.conversationService.getPartnerName(userId, conversation.participants as number[]);
      tempObject.lastMessage = await this.messageService.getLastMessageInConversation(conversation.id);
      tempObject.unread = await this.messageService.countUnreadMessage(conversation.id, userId);
      data.push(tempObject);
    }
    return data;
  }
}
