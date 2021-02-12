import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "teamsemicolon",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  }),
  // 10MB
  limits: { fileSize: 1024 * 1024 * 10 },
});

export const uploadMiddleware = upload.array("file", 10);
export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  console.log(location);
  res.json({ location });
};
///////////////////////////////////////////////////////////////
export const uploadProductsImages = async (req, res) => {
  console.log("여기로 오긴함?")
    uploadS3(req, res, (error) => {
        console.log('files', req.file);
        if (error) {
            console.log('errors', error);
            res.status(500).json({
                status: 'fail',
                error: error
            });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('uploadProductsImages Error: No File Selected!');
                res.status(500).json({
                    status: 'fail',
                    message: 'Error: No File Selected'
                });
            } else {
                // If Success
                let fileArray = req.file,
                    fileLocation;
                const images = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    console.log('filenm', fileLocation);
                    images.push(fileLocation)
                }
                // Save the file name into database
                return res.status(200).json({
                    status: 'ok',
                    filesArray: fileArray,
                    locationArray: images
                });
            }
        }
    })
};