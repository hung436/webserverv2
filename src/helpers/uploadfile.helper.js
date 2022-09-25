require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const { google } = require("googleapis");
// var multer = require("multer");
// var GoogleDriveStorage = require("multer-google-drive");
const stream = require("stream");
const multer = require("multer");
const { google } = require("googleapis");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_RECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_RECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// const drive = google.drive({ version: "v3", auth: oauth2Client });
// const uploadFile = multer({
//   storage: GoogleDriveStorage({
//     drive: drive,
//     parents: "1juBB6jARE1U-KZpo-J1nRdnhmUbyjOEg",
//     fileName: function (req, file, cb) {
//       let filename = `test-${file.originalname}`;
//       cb(null, filename);
//     },
//   }),
// });

// module.exports = {
//   uploadFile,
//   //   uploadFile: async (file) => {
//   //     try {
//   //       const createFile = await drive.files.create({
//   //         requestBody: {
//   //           name:
//   //             file.fieldname + "-" + Date.now() + path.extname(file.originalname),
//   //           mimeType: "image/jpg",
//   //         },
//   //         media: {
//   //           mimeType: "image/jpg",
//   //           body: file,
//   //         },
//   //       });
//   //       console.log(createFile.data);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   },
//   deleteFile: async (fileId) => {
//     try {
//       const deleteFile = await drive.files.delete({
//         fileId: fileId,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };

export const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google
    .drive({ version: "v3", auth: oauth2Client })
    .files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: ["1juBB6jARE1U-KZpo-J1nRdnhmUbyjOEg"],
      },
      fields: "id,name",
    });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};
