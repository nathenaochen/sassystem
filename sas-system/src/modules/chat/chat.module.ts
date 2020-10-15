import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {MessageSchema} from './chat.schema';
import { EventsGateway } from './events.gateway';

@Module({
  imports:[MongooseModule.forFeature([{name:'messageSchema', schema: MessageSchema,collection:'message'}])],
  providers: [ChatService, EventsGateway],
  controllers: [ChatController]
})
export class ChatModule {}
