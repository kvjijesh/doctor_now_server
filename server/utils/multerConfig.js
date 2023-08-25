import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './documents');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const documentFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and image files are allowed.'), false);
  }
};

export const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter,
});


// export default upload;
