//1
import multer from "multer";
// 2 preinstalled module from node.js to work with files and directory paths
import path from "path";

//1
const storage = multer.diskStorage({});

//2
function fileFilter(req, file, cb) {
  // function takes req (from frontend), file that is send, and cb=callback which is usually the next thing to do
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // variable to find out file extension
  // when typing path. all methods can be chosen, extname returns the last portion of the path
  // file.originalname is where the info will travel
  const extension = path.extname(file.originalname);
  // logic: if non of the extension, don't allow upload
  if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
    // To reject this file pass `false`, like so:
    cb(null, false);
  } else {
    // To accept the file pass `true`, like so:
    cb(null, true);
  }
}
//1 + 2
const multerUpload = multer({ storage, fileFilter });

// 3
export default multerUpload;
// use in userRouter
