const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    if (file.fieldname === 'icon') {
      cb(null, 'src/uploads/icons');
    } 
    
    else if (file.fieldname === 'section_images') {
      cb(null, 'src/uploads/plans');
    }

  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }

});

// File filter (only images)
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }

};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;