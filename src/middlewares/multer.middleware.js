// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({
//     storage,
// })
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/temp"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "avatar" || file.fieldname === "coverImage") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});
