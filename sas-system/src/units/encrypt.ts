import * as encrypt  from 'crypto';

//make salt
export function makesalt():string{
  return encrypt.randomBytes(3).toString('base64');
}

/**
 * 加密密码：
 * password:密码
 * salt：密码盐
 * 
 */
export function encryptPassword(password:string,salt:string):string{
  if (!password || !salt) {
    return'';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    encrypt.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}