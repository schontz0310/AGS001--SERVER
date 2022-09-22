import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  uploadsFolder: string;

  tmpFolder: string;

  multer: {
    storage: StorageEngine;
    limits: {
      fileSize?: number | undefined
    }
  };

  driver: 's3' | 'disk';

  config: {
    disk: null;
    aws: {
      bucket: string;
      region: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
    limits: 1048576,
  },

  config: {
    disk: null,
    aws: {
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
    },
  },
} as IUploadConfig;
