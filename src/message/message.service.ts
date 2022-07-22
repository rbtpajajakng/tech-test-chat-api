import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(conversationId: number, senderId: number, message: string) {
    return await this.prisma.message.create({
      data: {
        User: {
          connect: { id: senderId },
        },
        Conversation: {
          connect: { id: conversationId }
        },
        content: message
      }
    });
  }

  async getLastMessageInConversation (conversationId: number) {
    const lastMessageObject = await this.prisma.message.findFirst({
      where: { conversation_id: conversationId },
      orderBy: { sent_at: 'desc' }
    });
    return lastMessageObject.content;
  }

  async countUnreadMessage (conversationId: number, userId: number) {
    return await this.prisma.message.count({
      where: {
        conversation_id: conversationId,
        sender_id: userId,
        read: false
      }
    });
  }
}
