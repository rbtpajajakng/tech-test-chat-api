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
}
