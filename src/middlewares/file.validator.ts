import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Injectable()
export class FileMiddleware implements NestMiddleware {
  private upload = multer({
    limits: {
      fileSize: 200 * 1024 * 1024, //200 MB
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/png'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); 
      } else {
        cb(null, false);
      }
    },
  }).single('profilePicture');

  use(req: any, res: any, next: () => void) {
    this.upload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
      } else if (err) {
        res.status(500).json({ error: 'Error uploading file.' });
      } else if (!req.file) {
        res.status(400).json({ error: 'Please select a file.' });
      } else {
        next();
      }
    });
  }
}