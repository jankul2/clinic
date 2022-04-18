import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: path.join(path.resolve(), '/public/assets/images'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
export const imageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('invalid !imaage'))
        }
        cb(undefined, true);
    }
})



