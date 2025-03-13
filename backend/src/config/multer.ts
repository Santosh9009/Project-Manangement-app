import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, 'uploads/');
  },
  filename: (req:any, file:any, cb:any) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req:any, file:any, cb:any) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  },
});

export default upload;
