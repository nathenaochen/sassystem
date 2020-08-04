import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import {plainToClass,classToPlain} from 'class-transformer';
import {validate} from 'class-validator';

@Injectable()
export class ParseInitPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    let obj = plainToClass(metadata.metatype,value);
    let errors = await validate(obj,{ validationError:{target: false }});
    if(errors[0]){
      // console.log(classToPlain(errors));
      throw new BadRequestException(errors[0].constraints);
    }else{
      // console.log(111,this.ConfService.get('configs').common);
      return value;
    }
  }
  private toValidate(type :Function) : Boolean{
    let arrName: Function[] = [Object, String ,Boolean, Number, Array];
    // console.log(arrName); 
    return !arrName.includes(type);
  }
}
