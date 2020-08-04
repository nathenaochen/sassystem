import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {Request, Response} from 'express';
import {resData} from '../dto/res.dto';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
    if(exception instanceof HttpException){
      const status = exception.getStatus();
      // console.log('fliter');
      // console.log(ctx,status,'-----');
      // console.log('filter',this.logger.error+'');
      // this.logger.error(exception.getResponse(),'error trace','error message')z`
      response.status(status).send(resData.fail({},exception.getResponse()));
      // response.status(status).send(resData.success({}))
    }else{
      // console.log(exception.message,'oo');
      response.status(500).send(resData.fail({},exception.message));
    }
  }
  
}
