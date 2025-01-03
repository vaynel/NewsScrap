import express from 'express';
import session from 'express-session';
import passport from './config/passport';

import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

// import Router
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
import naverNewsRouter from './routes/naverNewsRoute';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 미들웨어 설정
// CORS 설정
app.use(
  cors({
    origin: 'http://localhost:3000', // 3000 포트에서의 요청 허용
    credentials: true, // 쿠키 전송 허용
  }),
);

app.use(express.json()); // JSON 요청 본문 파싱

// 세션 설정
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport 초기화 및 세션 연결
app.use(passport.initialize());
app.use(passport.session());

// 라우터 연결
app.use('/api/users', userRouter);
// 인증 라우터 등록
app.use('/auth', authRouter);

app.use('/naverapi', naverNewsRouter);

// 에러 핸들링 미들웨어
app.use(errorHandler);

export default app;
