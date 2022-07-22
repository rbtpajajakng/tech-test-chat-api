import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor (private prisma: PrismaService) {}
  async getConversation(sender: number, receiver: number) {
    const participants = [sender, receiver];
    const checkConversation = await this.prisma.conversation.findFirst({
      where: {
        participants: {
          array_contains: participants
        }
      }
    });
    if (!checkConversation) {
      return await this.prisma.conversation.create({
        data: {
          participants: sender == receiver ? [sender] : participants
        }
      });
    }
    return checkConversation;
  }

  async listAllUserConversation(user: number) {
    return await this.prisma.conversation.findMany({
      where: {
        participants: {
          array_contains: user
        }
      }
    });
  }

  async getPartnerName(user: number, participants: number[]) {
    const messageTo = await this.prisma.user.findFirst({
      where: {
        id: {
          in: participants,
          not: user
        }
      },
      select: { full_name: true }
    });
    return messageTo.full_name;
  }
}
