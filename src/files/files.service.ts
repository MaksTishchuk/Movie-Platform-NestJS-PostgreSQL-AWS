import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as shortId from 'shortid'
import * as path from 'path'
import  * as fs from 'fs'

@Injectable()
export class FilesService {

  async saveFile(
    mediaFile: Express.Multer.File,
    folder = 'default'
  ) {
    try {
      const fileExtension = mediaFile.originalname.split('.').pop()
      const fileName = mediaFile.originalname.split('.')[0] + '-' + shortId.generate() + '.' + fileExtension
      const filePath = path.resolve(__dirname, '..', 'static', folder)
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.resolve(filePath, fileName), mediaFile.buffer)
      return folder + '\\' + fileName
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  removeFile(filePath: string) {
    const fullFilePath = path.resolve(__dirname, '..', 'static', filePath)
    try {
      fs.unlinkSync(fullFilePath)
    } catch (err) {console.log('File with this path was not found!')}
  }
}
