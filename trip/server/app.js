const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// 

const HttpError = require('./models/http-error');


const app = express();
const port = 5000;

app.use(bodyParser.json());





//애러 관련 로직
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || '알 수 없는 애러가 발생했습니다.!!'});
});





mongoose.connect('mongodb+srv://shin:153123@cluster0.ydxf4.mongodb.net/trip?retryWrites=true&w=majority&appName=Cluster0')
 .then(() => {
    app.listen(port, (req,res) => {
        console.log(`포트번호${port}에서 서버가 실행중....`)
    });
}).catch((err) => {
    console.log(err);
})