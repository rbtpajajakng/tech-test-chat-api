import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConversationService } from 'src/conversation/conversation.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [MessageController],
  providers: [MessageService, ConversationService, UserService]
})
export class MessageModule {}
