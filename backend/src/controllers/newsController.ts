import News from '../models/News';
import axios from 'axios';
import Keyword from '../models/Keywords';
import { generateScreenshot } from '../services/screenshotService';
import { NaverNews } from '../models/News';

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;

export const saveNewsWithKeywords = async (
  newsData: any,
  keywords: string[],
) => {
  const news = await News.create(newsData);

  // 키워드 저장 및 연동
  const keywordInstances = await Promise.all(
    keywords.map((word) =>
      Keyword.findOrCreate({
        where: { keyword: word },
      }),
    ),
  );

  await news.addKeywords(keywordInstances.map(([keyword]) => keyword));
  console.log('뉴스와 키워드가 성공적으로 저장되었습니다.');
};

export const updateNewsFromNaverAPI = async (categories: string[]) => {
  try {
    for (const category of categories) {
      const response = await axios.get(
        'https://openapi.naver.com/v1/search/news.json',
        {
          headers: {
            'X-Naver-Client-Id': NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
          },
          params: {
            query: category,
            display: 10, // 카테고리별 최대 10개 기사 가져오기
            sort: 'date', // 최신순 정렬
          },
        },
      );

      const newsItems = response.data.items;

      // 병렬 처리를 위해 모든 작업을 배열로 저장
      const screenshotPromises = newsItems.map(async (item: NaverNews) => {
        const [news, created] = await News.findOrCreate({
          where: { title: item.title },
          defaults: {
            title: item.title,
            category,
            description: item.description,
            url: item.link,
            pubDate: new Date(item.pubDate), // pubDate 변환
            isScreenShot: false,
          },
        });

        // 새로운 뉴스에 대해 스크린샷 생성
        if (created) {
          try {
            const screenshotUrl = await generateScreenshot(news.url); // 스크린샷 생성
            await news.update({ isScreenShot: true }); // 스크린샷 상태 업데이트
            console.log(`스크린샷 생성 완료: ${screenshotUrl}`);
          } catch (screenshotError) {
            console.error(`스크린샷 생성 실패: ${news.url}`, screenshotError);
          }
        }

        // 키워드 추가 처리
        if (!news.addKeywords) {
          console.error('addKeywords 메서드가 정의되지 않았습니다.');
        } else {
          const keywords = extractKeywords(item.description);
          const keywordInstances = await Promise.all(
            keywords.map((word) =>
              Keyword.findOrCreate({
                where: { keyword: word },
              }),
            ),
          );
          await news.addKeywords(keywordInstances.map(([keyword]) => keyword));
        }
      });

      // 모든 스크린샷 작업 병렬 실행
      await Promise.all(screenshotPromises);
    }
    console.log('뉴스 업데이트 완료');
  } catch (error) {
    console.error('뉴스 업데이트 중 오류 발생:', error);
  }
};

const extractKeywords = (description: string): string[] => {
  const words = description
    .toLowerCase() // 소문자 변환
    .replace(/[^\w\s]/g, '') // 특수 문자 제거
    .split(' ')
    .filter((word) => word.length > 2); // 2글자 이상 단어만 추출
  return [...new Set(words)].slice(0, 5); // 중복 제거 후 최대 5개 반환
};
