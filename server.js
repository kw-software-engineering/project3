const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/upload', express.static('upload')); // 업로드 경로 정적 서빙

// mysql 
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

app.set('db', db);
console.log('MySQL Pool Created');

// 멀터 파일 업로드
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// html 업로드
app.post('/upload', upload.single('file'), async (req, res) => {
    const { title, author, isPublic, content, choice, lecture_id } = req.body;
    const filePath = req.file ? `/upload/${req.file.filename}` : null;

    try {
        const sql = `
            INSERT INTO post (created_time, title, context, token, file, choice, lecture_id)
            VALUES (NOW(), ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [title, content, isPublic, filePath, choice, lecture_id]);
        const redirectTarget = choice === '0' ? 'notice' : 'board';
        res.redirect(`/html/${redirectTarget}.html?lecture_id=${lecture_id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('DB 저장 실패');
    }
});

// 라우터
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


app.use('/api', userRoutes);
app.use('/api', postRoutes);


// 실행
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
