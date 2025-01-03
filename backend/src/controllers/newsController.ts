import News from '../models/News';
import axios from 'axios';
import Keyword from '../models/Keywords';

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

      for (const item of newsItems) {
        // 뉴스 저장
        // const [news] = await News.findOrCreate({
        //   where: { title: item.title }, // 제목 중복 방지
        //   defaults: {
        //     title: item.title, // title 추가
        //     category,
        //     description: item.description,
        //   },
        // });

        // // 키워드 추출 및 저장
        // const keywords = extractKeywords(item.description);
        // const keywordInstances = await Promise.all(
        //   keywords.map((word) =>
        //     Keyword.findOrCreate({
        //       where: { keyword: word },
        //     }),
        //   ),
        // );

        // await news.addKeywords(keywordInstances.map(([keyword]) => keyword));

        const [news] = await News.findOrCreate({
          where: { title: item.title },
          defaults: {
            title: item.title,
            category,
            description: item.description,
            url: item.link,
            pubData: item.pubDate,
          },
        });

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
      }
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
