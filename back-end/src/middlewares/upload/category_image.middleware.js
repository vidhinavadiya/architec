const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/categories'); // folder create kar lena
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Upload middleware
const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;