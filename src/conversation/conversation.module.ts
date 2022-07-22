import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConversationController],
  providers: [ConversationService, MessageService]
})
export class ConversationModule {}
