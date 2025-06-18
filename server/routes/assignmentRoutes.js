const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const db = req.app.get('db');
  try {
    const [rows] = await db.query('SELECT * FROM assignment ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '과제 목록 조회 실패' });
  }
});

router.get('/:id', async (req, res) => {
  const db = req.app.get('db');
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM assignment WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: '과제 없음' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '과제 조회 실패' });
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  const db = req.app.get('db');
  const { lecture_id, title, context, start_date, end_date, status } = req.body;
  const filePath = req.file ? `/upload/${req.file.filename}` : null;

  try {
    const sql = `
      INSERT INTO assignment (lecture_id, title, context, start_date, end_date, file, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [lecture_id, title, context, start_date, end_date, filePath, status || 0]);
    res.json({ message: '과제 등록 완료', insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '과제 등록 실패' });
  }
});

router.put('/:id', upload.single('file'), async (req, res) => {
  const db = req.app.get('db');
  const id = req.params.id;
  const { lecture_id, title, context, start_date, end_date, status } = req.body;
  const filePath = req.file ? `/upload/${req.file.filename}` : null;

  try {
    const [existingRows] = await db.query('SELECT file FROM assignment WHERE id = ?', [id]);
    if (existingRows.length === 0) return res.status(404).json({ message: '과제 없음' });

    const updateFile = filePath || existingRows[0].file;

    const sql = `
      UPDATE assignment
      SET lecture_id = ?, title = ?, context = ?, start_date = ?, end_date = ?, file = ?, status = ?
      WHERE id = ?
    `;
    await db.query(sql, [lecture_id, title, context, start_date, end_date, updateFile, status || 0, id]);
    res.json({ message: '과제 수정 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '과제 수정 실패' });
  }
});

router.delete('/:id', async (req, res) => {
  const db = req.app.get('db');
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM assignment WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: '과제 없음' });
    res.json({ message: '과제 삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '과제 삭제 실패' });
  }
});

module.exports = router;
