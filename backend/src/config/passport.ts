import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { KAKAO_CONFIG } from './kakao';
import { User } from '../models/User'; // Sequelize 모델을 가정

passport.use(
  new KakaoStrategy(
    {
      clientID: KAKAO_CONFIG.CLIENT_ID,
      clientSecret: KAKAO_CONFIG.CLIENT_SECRET, // 필요하면 추가
      callbackURL: KAKAO_CONFIG.REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 카카오 프로필 정보 확인
        const { id, username } = profile;
        const email = profile._json.kakao_account.email || 'test@kakao.com';

        console.log('카카오 프로필 정보:', profile.username);

        let user = await User.findOne({ where: { kakaoId: id } });
        if (!user) {
          user = await User.create({
            kakaoId: id,
            username: profile.username || 'Kakao User',
            email: email,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// 사용자 정보를 세션에 저장
passport.serializeUser((user: any, done) => {
  done(null, user);
});

// 세션에서 사용자 정보를 복구
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
