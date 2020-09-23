import * as mongoose from 'mongoose';
export const userAccountScheam = new mongoose.Schema({
  username:{type:String, required: true},
  account:{type:String, unique: true,required: true},
  password:{type:String, required: true},
  type:{type:String, required: true},
  tel:{type:String,require: false},
  createdate:{type:Number,require: false},
  salt:{type:String,require: false},
})