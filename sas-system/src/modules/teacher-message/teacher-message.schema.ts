import * as mongoose from 'mongoose';
export const TeacherMessage = new mongoose.Schema({
  account: {type:String,require: false},
  key:{type:String,require: false},
  name: {type:String,require: false},
  sex: {type:String,require: false},
  free_time: {type:String,require: false},
  school_tag: {type:String,require: false},
  degree: {type:String,require: false},
  teaching_time: {type:String,require: false},
  charge: {type:String,require: false},
  teach_class: {type:String,require: false},
  teach_project: {type:String,require: false},
  header_img: {type:String,require: false},
  teacher_level: {type:String,require: false},
  gethonor: {type:String,require: false},
  personal_introl: {type:String,require: false},
  teach_feature: {type:String,require: false},
  zuoyouming: {type:String,require: false},
})
TeacherMessage.index({key:1});