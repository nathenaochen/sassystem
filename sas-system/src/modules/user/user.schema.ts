import * as mongoose from 'mongoose';
export const userAccountScheam = new mongoose.Schema({
  username:{type:String, require: true},
  password:{type:String, require: true},
})