import { Body, Controller, Get, Post } from '@nestjs/common';
import {ChatService} from './chat.service';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService : ChatService){}

  @Get()
  index(){
    return 'chat'
  }

  //查询最近聊天列表
  @Post('recentlist')
  async recenetlyList(@Body() key){
    return await this.chatService.getRecentlyList(key);
  }

  //查询聊天详情记录
  @Post('chatdetail')
  async chatDetail(@Body() body){
    return await this.chatService.getChatDetail(body);
  }
}
