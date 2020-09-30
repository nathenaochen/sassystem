export class resData <T> {
  code: string;
  result: T;
  errorMeg? : object | string;

  constructor(code:string,result:T,errorMeg?: object | string){
    this.code = code;
    this.result = result;
    if(errorMeg){
      this.errorMeg = errorMeg;
    }
  }
  static success<P>(result:P,code:string = '0'){
    return new resData(code,result)
  }
  static fail<P>(result:P,errorMeg:object | string, code:string = '-1'){
    return new resData(code,result,errorMeg)
  }
}