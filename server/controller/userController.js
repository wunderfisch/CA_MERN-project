import { v2 as cloudinary } from "cloudinary";

const imageUpload = async (req, res) => {
  // console.log("req :>> ", req);

  // Upload file to cloudinary
  // make sure there is a file
  if (req.file) {
    try {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipesapp",
      });
      // console.log("uploadImage :>> ", uploadImage);
      res.status(201).json({
        message: "Your picture was uploaded successfully.",
        avatar: uploadImage.url,
      });
    } catch (error) {
      console.log("error with file upload:>> ", error);
    }
  } else {
    res.status(415).json({
      message: "Unsupported media type. This file type can't be accepted.",
    });
  }
};

export { imageUpload };
