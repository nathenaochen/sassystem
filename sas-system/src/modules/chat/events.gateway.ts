import { SubscribeMessage, WebSocketGateway,WebSocketServer,MessageBody,ConnectedSocket } from '@nestjs/websockets';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@WebSocketGateway(3001,{namespace: 'chat'})
export class EventsGateway {
  
  // @WebSocketServer() server;

  //链接数，用于计算当前的链接数
  onlineNum: number;

  //用于存储每个聊天详情页的链接的client对象
  connectionClientMap: Object;

  //用于存储每个聊天详情页的链接的client对象
  connectionMsgListClientMap: Object;

  //用于存储未读消息，计算条数
  noReadMsgNum: Object;

  constructor(@InjectModel('messageSchema') private readonly msgModel: Model, @InjectModel('recentlyChatSchema') private readonly recentModel: Model){
    this.onlineNum = 0;
    this.connectionClientMap = {};
    this.connectionMsgListClientMap = {};
    this.noReadMsgNum = {};
  }

  //处理监听message事件
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(payload);
    // client.broadcast.emit('message', payload);  //向所有保持链接的用户发送消息
    client.emit('message', payload);
    try{
      this.writeHistoryRecent(payload);
      this.writeHistoryMsg(payload);
    }catch(err){
      console.log(err);
    }
  }

  //处理监听进入页面时更新未读消息条数
  @SubscribeMessage('updataunread')
  async handMsgList(client: any, payload: any) {
    console.log(payload.sender + '_' + payload.receiver);
    // setInterval(()=>{
    //   client.emit('newmsg', {a:1});
    // },1000)
    try{
      if(this.noReadMsgNum[payload.receiver + '_' + payload.sender]){
        this.noReadMsgNum[payload.receiver + '_' + payload.sender] = 0;
      }
      await this.recentModel.updateOne(
        {writeId:payload.sender + '_' + payload.receiver},
        { 
          noreadNumber: 0
        }
      );
    }catch(err){
      console.log(err);
    }
    
  }

  @SubscribeMessage('connection')
  handleConnection(client: any, payload: any) {
    // console.log(client.handshake.query);
    //websocket建立连接时，根据不同的类型，存储当前的连接对象
    if(client.handshake.query.typeCon == 'detail'){
      this.connectionClientMap[client.handshake.query.sender] = client;
      this.onlineNum++;
      console.log(client.handshake.query.sender + ' connected,','onlineNum is  ' + this.onlineNum);
    }else if(client.handshake.query.typeCon == 'list'){
      // client.noreadNum = 0;  //用于记录未读的消息条数
      this.connectionMsgListClientMap[client.handshake.query.sender] = client;
      console.log(client.handshake.query.sender + ' LIST connected,');
    }
    client.on('disconnect', () => {
      //websocket关闭连接时，根据不同的类型，删除当前的连接对象
      if(this.connectionClientMap[client.handshake.query.sender]){
        delete this.connectionClientMap[client.handshake.query.sender];
        this.onlineNum--;
        console.log(client.handshake.query.sender + ' disconnected,', 'onlineNum is  ' + this.onlineNum);
      }else if(this.connectionMsgListClientMap[client.handshake.query.sender]){
        delete this.connectionMsgListClientMap[client.handshake.query.sender];
        console.log(client.handshake.query.sender + ' List disconnected');
      }
    });
  }

  //存储历史消息
  async writeHistoryMsg(payload: any){
    //用户之间的会话id，用于查询会话记录时的索引
    let sessionId: string;
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

  //存储记录最近联系人消息
  async writeHistoryRecent(payload: any){
    //如果接受者在线，则将消息分发给接受者
    if(this.connectionClientMap[payload.receiver]){
      this.connectionClientMap[payload.receiver].emit('message', payload);
      //更新当前用户（发送者）的最近联系人信息  先查询发送者是否有与该接受者有历史聊天记录,有的话则直接跟新最新的聊天消息，时间和未读消息数量
      const recentKwssage = await this.recentModel.updateOne({
        writeId:payload.sender + '_' + payload.receiver},
        { date:new Date().getTime(),
          nestMsg:payload.msg,
          noreadNumber: 0}
      );

      const recentReceiverKwssage = await this.recentModel.updateOne({
        writeId:payload.receiver + '_' + payload.sender},
        { date:new Date().getTime(),
          nestMsg:payload.msg,
          noreadNumber: 0}
      );
      // console.log(recentKwssage);

      //如果没有则新建历史记录
      if(recentKwssage.n == 0){
        const newRecentl = new this.recentModel({
          writeId: payload.sender + '_' + payload.receiver,
          sender:payload.sender,
          receiver: payload.receiver,
          date:new Date().getTime(),
          nestMsg:payload.msg,
          name:payload.receivername,
          noreadNumber: 0,
        });
        newRecentl.save();
      }

      //如果没有则新建历史记录
      if(recentReceiverKwssage.n == 0){
        const newReceiverRecentl = new this.recentModel({
          writeId: payload.receiver + '_' + payload.sender,
          sender:payload.receiver,
          receiver: payload.sender,
          date:new Date().getTime(),
          nestMsg:payload.msg,
          name:payload.sendername,
          noreadNumber: 0,
        });
        newReceiverRecentl.save();
      }
    }else if(this.connectionMsgListClientMap[payload.receiver]){ //如果接受者处于消息列表页，则新消息提示
      // this.connectionMsgListClientMap[payload.receiver].noreadNum++;
      if(this.noReadMsgNum[payload.receiver + '_' + payload.sender]){
        this.noReadMsgNum[payload.receiver + '_' + payload.sender]++;
      }else{
        this.noReadMsgNum[payload.receiver + '_' + payload.sender] = 1
      }
      //向列表页推送新消息提示
      this.connectionMsgListClientMap[payload.receiver].emit('newmsg', {
        sender:payload.receiver,
        receiver:payload.sender,
        date: new Date().getTime(),
        name: payload.sendername, 
        nestMsg: payload.msg, 
        noreadNumber:this.noReadMsgNum[payload.receiver + '_' + payload.sender]
      });

      //更新当前用户（发送者）的最近联系人信息  先查询发送者是否有与该接受者有历史聊天记录,有的话则直接跟新最新的聊天消息，时间和未读消息数量
      const recentKwssage = await this.recentModel.updateOne({
        writeId:payload.sender + '_' + payload.receiver},
        { date:new Date().getTime(),
          nestMsg:payload.msg,
          noreadNumber: 0
        }
      );

      const recentReceiverKwssage = await this.recentModel.updateOne({
        writeId:payload.receiver + '_' + payload.sender},
        { date:new Date().getTime(),
          nestMsg:payload.msg,
          noreadNumber: this.noReadMsgNum[payload.receiver + '_' + payload.sender]
        }
      );
      console.log(recentKwssage);
      //如果没有则新建历史记录
      if(recentKwssage.n == 0){
        const newRecentl = new this.recentModel({
          writeId: payload.sender + '_' + payload.receiver,
          sender:payload.sender,
          receiver: payload.receiver,
          date:new Date().getTime(),
          nestMsg:payload.msg,
          name:payload.receivername,
          noreadNumber: 0,
        });
        newRecentl.save();
      }

      //如果没有则新建历史记录
      if(recentReceiverKwssage.n == 0){
        const newRecentl = new this.recentModel({
          writeId: payload.receiver + '_' + payload.sender,
          sender:payload.receiver,
          receiver: payload.sender,
          date:new Date().getTime(),
          nestMsg:payload.msg,
          name:payload.sendername,
          noreadNumber: 1,
        });
        newRecentl.save();
      }
    }else{//如果接受者不在线，则直接跟新最近联系消息列表

      if(this.noReadMsgNum[payload.receiver + '_' + payload.sender]){
        this.noReadMsgNum[payload.receiver + '_' + payload.sender]++;
      }else{
        this.noReadMsgNum[payload.receiver + '_' + payload.sender] = 1
      }

      const recentKwssage = await this.recentModel.updateOne({
        writeId:payload.sender + '_' + payload.receiver},
        { date:new Date().getTime(),
          nestMsg:payload.msg,
          noreadNumber: 0
        }
      );

      const recentReceiverKwssage = await this.recentModel.updateOne({
        writeId:payload.receiver + '_' + payload.sender},
        { date:new Date().getTime(),
          nestMsg:payload.msg,
          noreadNumber: this.noReadMsgNum[payload.receiver + '_' + payload.sender]
        }
      );

      //如果没有则新建历史记录
      if(recentKwssage.n == 0){
        const newRecentl = new this.recentModel({
          writeId: payload.sender + '_' + payload.receiver,
          sender:payload.sender,
          receiver: payload.receiver,
          date:new Date().getTime(),
          nestMsg:payload.msg,
          name:payload.receivername,
          noreadNumber: 0,
        });
        newRecentl.save();
      }

      //如果没有则新建历史记录
      if(recentReceiverKwssage.n == 0){
        const newRecentl = new this.recentModel({
          writeId: payload.receiver + '_' + payload.sender,
          sender:payload.receiver,
          receiver: payload.sender,
          date:new Date().getTime(),
          nestMsg:payload.msg,
          name:payload.sendername,
          noreadNumber: 1,
        });
        newRecentl.save();
      }
    }
  }


}
