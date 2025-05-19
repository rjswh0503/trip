require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const HttpError = require('./models/http-error');
const userRoutes = require('./routes/users-routes');
const postRoutes = require('./routes/post-routes');
const commentRoutes = require('./routes/comment-routes');
const placesRoutes = require('./routes/places-routes');
const reviewRoutes = require('./routes/review-routes');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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








mongoose.connect('mongodb+srv://shin:153123@cluster0.ydxf4.mongodb.net/trip?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB 연결 성공');
        app.listen(PORT, () => {
            console.log(`서버 실행 중: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB 연결 실패:', err);
    });