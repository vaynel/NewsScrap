import { Router } from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';

const router = Router();
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';

// 카카오 로그인 시작 (카카오 로그인 페이지로 리다이렉트)
router.get(
  '/kakao',
  (req, res, next) => {
    console.log('카카오 로그인 시작');
    next();
  },
  passport.authenticate('kakao'),
);

// 카카오 로그인 콜백
router.get(
  '/kakao/callback',
  (req, res, next) => {
    console.log('카카오 로그인 콜백 호출');
    next();
  },
  passport.authenticate('kakao', { failureRedirect: '/' }),
  (req, res) => {
    console.log('로그인 성공');
    //console.log('사용자 정보:', req.user);

    // JWT 생성
    const user = req.user as { id: number; email: string; username: string };
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '2h',
      },
    );
    console.log('발급된 토큰 : ' + token);

    // JWT를 HttpOnly 쿠키로 저장
    res.cookie('jwt', token, {
      httpOnly: true, // 클라이언트에서 접근 불가
      secure: false, // HTTPS에서만 전송
      maxAge: 3600000, // 1시간
    });

    // 성공 페이지로 리다이렉트
    res.redirect('http://localhost:3000/');
  },
);

export default router;
