const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const session = require('express-session');  // ✅ 세션 미들웨어 불러오기
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ 세션 미들웨어 적용 (반드시 라우터 등록 전에)
app.use(session({
    secret: 'your-secret-key',       // 원하면 .env로 분리
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,               // HTTPS 쓰면 true
        maxAge: 1000 * 60 * 60       // 1시간
    }
}));

// 기본 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/upload', express.static('upload'));

// ✅ MySQL 커넥션 풀
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
app.set('db', db);
console.log('MySQL Pool Created');

// ✅ 파일 업로드 처리
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ✅ HTML에서 파일 업로드 처리
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

// ✅ 라우터 등록
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

app.use('/api/assignments', assignmentRoutes);
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api', postRoutes);

app.use(
  '/upload/submissions',
  express.static(path.join(__dirname, 'upload/submissions'))
);

// ✅ 서버 실행
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
