import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, resolve } from 'path';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, resolve(__dirname, '../../../uploads'));
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
    callback(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    upload.single('cover')(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'File upload failed', error: err.message });
      }
      next();
    });
  }
}
