import multer from "multer";
import _dirname from "../utils.js";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, `${_dirname}/public/img`);
    },
    filename: function (req,file,callback) {
        return callback(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage});

export default uploader;