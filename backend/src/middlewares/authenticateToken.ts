import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log(req.headers.cookie);
  const cookies = req.headers.cookie?.split('; ') || [];
  const jwtCookie = cookies.find((cookie) =>
    cookie.startsWith('jwt='),
  ) as String;
  const sessionCookie = cookies.find((cookie) =>
    cookie.startsWith('connect.sid='),
  );

  console.log('JWT 쿠키:', jwtCookie);
  console.log('세션 쿠키:', sessionCookie);

  const token = jwtCookie.split('=')[1]; // 'jwt=토큰'에서 토큰 값만 추출

  if (!token) {
    res.status(401).json({ message: '인증이 필요합니다.' });
    return;
  }

  jwt.verify(
    token,
    ACCESS_TOKEN_SECRET,
    (err: Error | null, user: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
      }

      // TypeScript에서 req 확장 (req.user 사용 가능하도록)
      (req as any).user = user;
      next();
    },
  );
}

// export function authenticateToken(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log('클라이언트 토큰 : ' + token);

//   if (!token) {
//     res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
//     return; // 여기에서 명확히 종료
//   }

//   jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       console.error('JWT 검증 실패:', err.message);
//       res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
//       return; // 여기에서도 명확히 종료
//     }

//     console.log('JWT 디코딩 결과:', user);
//     (req as any).user = user; // TypeScript에서 req 확장
//     next(); // 다음 미들웨어로 이동
//   });
// }
