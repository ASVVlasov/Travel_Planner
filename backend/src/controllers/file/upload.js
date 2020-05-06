const path = require('path')

const getExt = (filename) => {
   const splitFile = filename.split('.')
   return splitFile[splitFile.length - 1]
}

const upload = (req, res) => {
   try {
      if (!req.files) {
         res.json({
            status: false,
            message: 'No file uploaded',
         })
      } else {
         const uploadFile = req.files.file
         const generatedFileName = `${uploadFile.md5}.${getExt(
            uploadFile.name
         )}`
         uploadFile.mv(
            path.resolve(__dirname, '..', '..', 'uploads', generatedFileName)
         )
         res.send({
            status: true,
            message: 'File is uploaded',
            data: {
               name: generatedFileName,
               mimetype: uploadFile.mimetype,
               size: uploadFile.size,
            },
         })
      }
   } catch (err) {
      res.status(500).send(err)
   }
}

module.exports = upload
