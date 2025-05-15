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
const cors = require('cors');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
    origin: 'https://trip-ojvx.onrender.com',  // 프론트 주소
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // <- 중요!
}));





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








mongoose.connect(process.env.MONGO)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`포트번호${PORT}에서 서버가 실행중....`)
        });
    }).catch((err) => {
        console.log(err);
    })