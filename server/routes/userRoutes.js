const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/userController');  // signup 추가

// 로그인
router.post('/login', login);

// 회원가입
router.post('/signup', signup);   // 회원가입 추가

module.exports = router;