import multer from 'multer';
import path from 'path';

const _10MB = 10 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv' || file.mimetype === 'application/pdf') {
    cb(null, true); // Aceita o arquivo
  } else {
    cb(new Error('Formato de arquivo inválido. Apenas .csv e .pdf são permitidos.'), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: _10MB
  }
});

export default upload;