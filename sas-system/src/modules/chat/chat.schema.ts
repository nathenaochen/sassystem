import * as mongoose from 'mongoose';
//消息落库文档结构
export const MessageSchema = new mongoose.Schema({
  sessionId: {type:String,require: true},
  sender:{type:String,require: true},
  receiver: {type:String,require: true},
  createdate:{type:Number,require: true},
  msg:{type:String,require: true},
})
MessageSchema.index({sessionId:1});

//最近聊天对象记录文档结构
export const RecentlyChatSchema = new mongoose.Schema({
  writeId: {type:String,require: true},
  sender:{type:String,require: true},
  receiver: {type:String,require: true},
  date:{type:Number,require: true},
  nestMsg:{type:String,require: true},
  name:{type:String,require: true},
  noreadNumber: {type:Number,require: true},
})
RecentlyChatSchema.index({sender:1});