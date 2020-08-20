import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map,timeout} from 'rxjs/operators';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';

@Injectable()
export class InterceptorInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger){

  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();
    // console.log('interceptor--gloab');
    // const isCached = true;
    // if (isCached) {
    //   return of([]);
    // }
    this.logger.log(JSON.stringify({
      reqBody:req.body,
      reqQuery:req.query,
      url:req.url
    }),'cur Request')
    return next.handle().pipe(map((data)=>{this.logger.log(JSON.stringify({
      res:data,
      url:req.url
    }),'cur Response');return (data || {});}));
  }
}
