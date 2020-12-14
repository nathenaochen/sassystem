import * as mongoose from 'mongoose';
export const StudentMessage = new mongoose.Schema({
  account: {type:String,require: false},
  key:{type:String,require: false},
  name: {type:String,require: false},
  sex: {type:String,require: false},
  free_time: {type:String,require: false},
  charge: {type:String,require: false},
  class: {type:String,require: false},
  subject: {type:String,require: false},
  header_img: {type:String,require: false},
  zuoyouming: {type:String,require: false},
  request: {type:String,require: false},
  createdate: {type:Number,require: false},
})
StudentMessage.index({key:1});