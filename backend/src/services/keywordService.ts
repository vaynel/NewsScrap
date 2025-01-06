import { NlpManager } from 'node-nlp';
import natural from 'natural';
import pLimit from 'p-limit';

/**
 * HTML 태그 제거 함수
 * @param text HTML 태그가 포함된 텍스트
 * @returns HTML 태그가 제거된 텍스트
 */
const removeHtmlTags = (text: string): string => {
  return text.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ');
};

/**
 * 키워드 추출 함수 (한국어)
 * @param text 분석할 텍스트
 * @returns 키워드 배열
 */
const extractKoreanKeywords = async (text: string): Promise<string[]> => {
  const manager = new NlpManager({ languages: ['ko'] });

  // HTML 태그 제거 및 텍스트 정리
  const cleanedText = removeHtmlTags(text);

  // 텍스트 분석
  manager.addDocument('ko', cleanedText, 'analysis');
  const result = await manager.process('ko', cleanedText);

  // 불용어 및 키워드 필터링
  const stopWords = [
    '그리고',
    '하지만',
    '또는',
    '이것',
    '그것',
    '이',
    '그',
    '저',
    '의',
    '가',
    '에',
    '들',
    '으로',
    '와',
    '과',
    '를',
    '은',
    '는',
    '이다',
    '있다',
    '없다',
    '수',
    '때',
    '에서',
    '및',
    '한',
    '하기',
    '위해',
    '중',
    '대한',
    '속',
    '모든',
    '더',
    '등',
    '또',
    '및',
  ];

  const filteredKeywords = result.entities
    .map((entity) => entity.sourceText)
    .filter(
      (word) =>
        word.length > 1 && // 길이가 1 이상
        /^[가-힣]+$/.test(word) && // 한글만 허용
        !stopWords.includes(word), // 불용어 제거
    );

  return Array.from(new Set(filteredKeywords)).slice(0, 5); // 중복 제거 후 최대 5개 반환
};

/**
 * 키워드 추출 함수 (영어)
 * @param text 분석할 텍스트
 * @returns 키워드 배열
 */
const extractEnglishKeywords = (text: string): string[] => {
  const tokenizer = new natural.WordTokenizer();
  const cleanedText = removeHtmlTags(text);
  const words = tokenizer.tokenize(cleanedText);

  // 불용어 제거
  const stopWords = [
    'and',
    'or',
    'but',
    'this',
    'that',
    'is',
    'in',
    'on',
    'for',
    'at',
  ];
  const filteredWords = words.filter(
    (word) =>
      word.length > 2 && // 길이가 2 이상
      /^[a-zA-Z]+$/.test(word) && // 영어 단어만 허용
      !stopWords.includes(word.toLowerCase()), // 불용어 제거
  );

  return Array.from(new Set(filteredWords)).slice(0, 5); // 중복 제거 후 반환
};

/**
 * 영어와 한국어 키워드 추출 함수
 * @param title 뉴스 제목
 * @param description 뉴스 설명
 * @returns 키워드 배열
 */
export const extractKeywords = async (
  title: string,
  description: string,
): Promise<string[]> => {
  const combinedText = `${title} ${description}`;

  const [koreanKeywords, englishKeywords] = await Promise.all([
    extractKoreanKeywords(combinedText),
    Promise.resolve(extractEnglishKeywords(combinedText)),
  ]);

  // 중복 제거 및 최대 5개 키워드 반환
  const uniqueKeywords = Array.from(
    new Set([...koreanKeywords, ...englishKeywords]),
  );
  return uniqueKeywords.slice(0, 5);
};

/**
 * 뉴스 데이터를 비동기로 처리
 * @param newsData 뉴스 데이터 배열
 */
export const processNewsData = async (
  newsData: { title: string; description: string }[],
) => {
  const limit = pLimit(3); // 최대 3개의 작업을 동시에 처리

  const tasks = newsData.map((news) =>
    limit(async () => {
      const keywords = await extractKeywords(news.title, news.description);
      console.log(`뉴스 제목: ${news.title}`);
      console.log(`키워드: ${keywords}`);
      return { ...news, keywords };
    }),
  );

  return Promise.all(tasks); // 모든 작업 완료 후 결과 반환
};
