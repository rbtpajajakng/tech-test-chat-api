import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MessageModule, ConversationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
