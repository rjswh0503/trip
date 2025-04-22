const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config()
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/users-routes');
const postRoutes = require('./routes/post-routes');
const commentRoutes = require('./routes/comment-routes');
const placesRoutes = require('./routes/places-routes');
const reviewRoutes = require('./routes/review-routes');

const app = express();
const port = 5000;




app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-COntrol-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/review/place', reviewRoutes);


//애러 관련 로직
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || '알 수 없는 애러가 발생했습니다.!!' });
});








mongoose.connect('mongodb+srv://shin:153123@cluster0.ydxf4.mongodb.net/trip?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(port, (req, res) => {
            console.log(`포트번호${port}에서 서버가 실행중....`)
        });
    }).catch((err) => {
        console.log(err);
    })