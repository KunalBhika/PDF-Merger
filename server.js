const express = require('express')
const multer  = require('multer')
const {combinePdfs} = require('./mainMerger')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const app = express()
const port = 3000

// express.static(folder-name) is used if you want to make a particular folder accessable to the users.
app.use('/static' , express.static('finalPdfs'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , 'templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files);
    let currTime = await combinePdfs(req.files[0].path , req.files[1].path);
    res.redirect(`http://localhost:3000/static/combined-${currTime}.pdf`);
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})