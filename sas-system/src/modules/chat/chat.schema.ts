import * as mongoose from 'mongoose';
export const MessageSchema = new mongoose.Schema({
  sessionId: {type:String,require: true},
  sender:{type:String,require: true},
  receiver: {type:String,require: true},
  createdate:{type:Number,require: true},
  msg:{type:String,require: true},
})
MessageSchema.index({sessionId:1});