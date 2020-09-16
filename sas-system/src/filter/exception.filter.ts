import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger } from '@nestjs/common';
import {Request, Response} from 'express';
import {resData} from '../dto/res.dto';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger){

  }
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
      this.logger.error(exception.getResponse(),'error trace','error message')
      response.status(status).send(resData.fail({},exception.getResponse(),`${status}`));
      // response.status(status).send(resData.success({}))
    }else{
      // console.log(exception.message,'oo');
      this.logger.error(exception.message,'error trace','error message')
      response.status(200).send(resData.fail({},exception.message));
    }
  }
  
}
