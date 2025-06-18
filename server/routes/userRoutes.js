const express = require('express');
const router = express.Router();
const { login, signup, getUserInfo } = require('../controllers/userController');
// signup 추가

// 로그인
router.post('/login', login);

// 회원가입
router.post('/signup', signup);   


//정보 조회
router.get('/userinfo', getUserInfo);

module.exports = router;