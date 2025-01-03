import app from './app';
import { sequelize } from './config/database';
import { startNewsUpdateScheduler } from './scheduler/newsScheduler';

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // 데이터베이스 연결 확인
    await sequelize.authenticate();
    console.log('DB 연결 성공');

    // 데이터베이스 모델 동기화
    await sequelize.sync();
    console.log('모델 동기화 성공');

    // Express 서버 시작
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('서버 실행 중 오류 발생:', error);
    process.exit(1); // 비정상 종료
  }
}

// 뉴스 업데이트 스케줄러 시작
startNewsUpdateScheduler();

startServer();
