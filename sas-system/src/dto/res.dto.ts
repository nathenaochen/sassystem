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
  static success(result:object,code:string = '0'){
    return new resData<object>(code,result)
  }
  static fail(result:object,errorMeg:object | string, code:string = '-1'){
    return new resData(code,result,errorMeg)
  }
}