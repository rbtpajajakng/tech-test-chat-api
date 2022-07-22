import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService,
    private prisma: PrismaService
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
  
  @Get('message/:conversationId')
  async getMessagesInConversation(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Query('userId', ParseIntPipe) userId: number
  ) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: { array_contains: userId }
      }
    });
    if (!conversation) return [];
    const participants = conversation.participants as number[];
    const partner = participants.filter(p => p != userId);
    
    await this.messageService.readMessage(conversationId, partner);

    return await this.messageService.getAllMessageInConversation(conversationId);
  }
}
