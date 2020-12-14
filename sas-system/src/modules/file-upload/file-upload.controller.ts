import { Body, Controller, Post, UploadedFile,UseInterceptors } from '@nestjs/common';
import {FileUploadService} from './file-upload.service';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploader: FileUploadService){}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file,@Body() body){
    console.log(file);
    console.log(join(__dirname,'../../../public', `${file.originalname}`));
    console.log('/','/etc');
    const writeImage = createWriteStream(`/usr/share/nginx/html/zhifututor/common/images/${file.originalname}`)
    writeImage.write(file.buffer)
    writeImage.on('end',()=>{
      console.log(99)
    })
    writeImage.on('error',(e)=>{
      throw new Error(e.message);
    });
    return '上传成功'
  }
}
