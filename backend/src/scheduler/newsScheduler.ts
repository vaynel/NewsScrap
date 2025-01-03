import schedule from 'node-schedule';
import { updateNewsFromNaverAPI } from '../controllers/newsController';

const categories = ['스포츠', '정치', '연애', 'IT']; // 카테고리 설정

// export const startNewsUpdateScheduler = () => {
//   const times = ['09:00', '15:00', '21:00']; // 하루 3번 업데이트

//   times.forEach((time) => {
//     const [hour, minute] = time.split(':');
//     schedule.scheduleJob(
//       { hour: parseInt(hour), minute: parseInt(minute) },
//       () => {
//         console.log(`[${time}] 뉴스 업데이트 시작`);
//         updateNewsFromNaverAPI(categories);
//       },
//     );
//   });

//   console.log('뉴스 업데이트 스케줄러가 설정되었습니다.');
// };

export const startNewsUpdateScheduler = () => {
  // 크론 표현식: "*/20 * * * *" => 매 20분마다 실행
  schedule.scheduleJob('*/20 * * * *', () => {
    const now = new Date();
    console.log(`[${now.toLocaleTimeString()}] 뉴스 업데이트 시작`);
    updateNewsFromNaverAPI(categories);
  });

  console.log('20분마다 실행되는 뉴스 업데이트 스케줄러가 설정되었습니다.');
};
