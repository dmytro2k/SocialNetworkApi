import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { validateImageFile } from './validation';

const multerStorage = (dirPath: string) => {
  return multer.diskStorage({
    destination(_, file, cb) {
      const root = '/Users/dima/Desktop/study/newNode/SNbackend';
      cb(null, path.join(root, dirPath));
    },
    filename: (_, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`),
  });
};

export const uploadPostImage = multer({
  storage: multerStorage('images/post/originals'),
  fileFilter: (_, file, cb) => validateImageFile(file, cb),
});
export const uploadAvatarImage = multer({
  storage: multerStorage('images/avatar/originals'),
  fileFilter: (_, file, cb) => validateImageFile(file, cb),
});
