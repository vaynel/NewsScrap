import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await User.findAll();
    // 정상 응답
    res.json(users);
  } catch (error) {
    console.error(error);
    // 에러 핸들러(미들웨어)로 전달
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { username, email } = req.body;

    // 데이터 생성
    const newUser = await User.create({ username, email });

    // 성공 응답
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);

    // 에러를 미들웨어로 전달
    next(error);
  }
}

export function getUserProfile(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({ message: '인증 정보가 없습니다.' });
    return; // 명확히 종료
  }

  res.json({
    message: '사용자 정보 조회 성공',
    user: req.user, // authenticateToken에서 설정한 사용자 정보
  });
}
