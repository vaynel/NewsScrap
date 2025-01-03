import dotenv from 'dotenv';

dotenv.config();

export const KAKAO_CONFIG = {
  CLIENT_ID: process.env.KAKAO_CLIENT_ID || '',
  CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET || '', // 필요 시
  REDIRECT_URI: process.env.KAKAO_REDIRECT_URI || 'http://localhost:4000/auth/kakao/callback',
};
