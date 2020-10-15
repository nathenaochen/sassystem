import { SubscribeMessage, WebSocketGateway,WebSocketServer } from '@nestjs/websockets';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@WebSocketGateway(3001,{namespace: 'chat'})
export class EventsGateway {
  
  // @WebSocketServer() server;

  //链接数，用于计算当前的链接数
  onlineNum: number;

  //用于存储每个链接的client对象
  connectionClientMap: Object;

  constructor(@InjectModel('messageSchema') private readonly msgModel: Model){
    this.onlineNum = 0;
    this.connectionClientMap = {};
  }

  //处理监听message事件
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    // console.log(payload,this.connectionClientMap[payload.receiver]);
    // client.broadcast.emit('message', payload);  //向所有保持链接的用户发送消息
    //用户之间的会话id，用于查询会话记录时的索引
    let sessionId: string;
    client.emit('message', payload);
    //如果接受者在线，则将消息分发给接受者
    if(this.connectionClientMap[payload.receiver]){
      this.connectionClientMap[payload.receiver].emit('message', payload)
    }
    if(payload.sender > payload.receiver){
      sessionId = payload.sender + payload.receiver;
    }else{
      sessionId = payload.receiver + payload.sender;
    }
    const newMsg = new this.msgModel({
      sessionId: sessionId,
      sender: payload.sender,
      receiver: payload.receiver,
      msg:payload.msg,
      createdate: new Date().getTime()
    });
    //消息落库
    newMsg.save();
  }

  @SubscribeMessage('connection')
  handleConnection(client: any, payload: any) {
    console.log(client.handshake.query);
    this.connectionClientMap[client.handshake.query.sender] = client;
    this.onlineNum++;
    console.log(client.handshake.query.sender + ' connected,','onlineNum is  ' + this.onlineNum);
    client.on('disconnect', () => {
      delete this.connectionClientMap[client.handshake.query.sender];
      this.onlineNum--;
      console.log(client.handshake.query.sender + ' disconnected,', 'onlineNum is  ' + this.onlineNum);
    });
  }


}
