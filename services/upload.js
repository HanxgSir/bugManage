const multer = require('multer');
module.exports = function (app) {
    const upload = multer({dest: './uploads'});
    app.post('/picture', upload.single('file'), function (req, res) {
        res.send({status: 0, file: req.file})
    });
};