const express = require('express');
const router = express.Router();
const db = require('../db.js'); // DB 연결 모듈
const multer = require('multer');
const path = require('path');

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); // 업로드 디렉토리
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// 업로드 처리 (자료 또는 공지사항)
router.post('/upload-post', upload.single('file'), (req, res) => {
  const { title, author, isPublic, content, lecture_id, choice } = req.body;
  const filePath = req.file ? `/upload/${req.file.filename}` : null;

  const query = `
    INSERT INTO post (created_time, title, context, token, file, choice, lecture_id)
    VALUES (NOW(), ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [title, content, isPublic, filePath, choice, lecture_id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 저장 실패');
    }

    // 업로드 후 리디렉션
    const redirectPage = choice === '0' ? 'notice' : 'board';
    res.redirect(`/html/${redirectPage}.html?lecture_id=${lecture_id}`);
  });
});


// 자료 목록 조회 (강의별)
router.get('/materials', (req, res) => {
  const lectureId = req.query.lecture_id;
  const query = lectureId
    ? "SELECT * FROM post WHERE choice = 1 AND lecture_id = ? ORDER BY id DESC"
    : "SELECT * FROM post WHERE choice = 1 ORDER BY id DESC";

  db.query(query, lectureId ? [lectureId] : [], (err, rows) => {
    if (err) return res.status(500).send('DB Error');
    res.json(rows);
  });
});

// 자료 최근 3개
router.get('/materials/latest', (req, res) => {
  const lectureId = req.query.lecture_id;
  const query = `
    SELECT * FROM post 
    WHERE choice = 1 AND lecture_id = ?
    ORDER BY created_time DESC
    LIMIT 3
  `;
  db.query(query, [lectureId], (err, results) => {
    if (err) return res.status(500).send('DB Error');
    res.json(results);
  });
});

// 자료 상세 조회
router.get('/materials/:id', (req, res) => {
  const postId = req.params.id;
  const query = "SELECT * FROM post WHERE id = ?";
  db.query(query, [postId], (err, rows) => {
    if (err) return res.status(500).send('DB Error');
    if (rows.length === 0) return res.status(404).send('게시글 없음');
    res.json(rows[0]);
  });
});

// 공지사항 목록 조회
router.get('/notice', (req, res) => {
  const lectureId = req.query.lecture_id;
  const query = lectureId
    ? "SELECT * FROM post WHERE choice = 0 AND lecture_id = ? ORDER BY id DESC"
    : "SELECT * FROM post WHERE choice = 0 ORDER BY id DESC";

  db.query(query, lectureId ? [lectureId] : [], (err, rows) => {
    if (err) return res.status(500).send('DB Error');
    res.json(rows);
  });
});

//공지사항 최근 3개
router.get('/notice/latest', (req, res) => {
  const lectureId = req.query.lecture_id;
  const query = `
    SELECT * FROM post 
    WHERE choice = 0 AND lecture_id = ?
    ORDER BY created_time DESC
    LIMIT 3
  `;
  db.query(query, [lectureId], (err, results) => {
    if (err) return res.status(500).send('DB Error');
    res.json(results);
  });
});

// 공지사항 상세 조회
router.get('/notice/:id', (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM post WHERE id = ? AND choice = 0";
  db.query(query, [id], (err, rows) => {
    if (err) return res.status(500).send('DB Error');
    if (rows.length === 0) return res.status(404).send('공지사항 없음');
    res.json(rows[0]);
  });
});

module.exports = router;
