import { exec } from 'child_process';
import natural from 'natural';
import path from 'path';
import he from 'he'; // HTML 엔터티 디코딩

/**
 * HTML 태그 제거 함수
 */
const removeHtmlTags = (text: string): string =>
  text.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ');

/**
 * Python 스크립트를 실행하여 한국어 키워드 추출
 * @param title 뉴스 제목
 * @param description 뉴스 설명
 * @returns 키워드 배열
 */
export const extractKoreanKeywords = async (
  title: string,
  description: string,
): Promise<string[]> => {
  const scriptPath = path.resolve(__dirname, './keyword_extractor.py'); // Python 스크립트 경로
  console.log(title);

  // HTML 엔터티 제거 및 텍스트 정리
  const cleanedTitle = removeHtmlTags(he.decode(title));
  const cleanedDescription = removeHtmlTags(he.decode(description));

  const input = JSON.stringify({
    title: cleanedTitle,
    description: cleanedDescription,
  });

  console.log('디코딩 및 태그 제거 완료 제목:', cleanedTitle);
  console.log('디코딩 및 태그 제거 완료 설명:', cleanedDescription);
  console.log('최종 전달 JSON -----');
  console.log(input);

  // **따옴표**와 **백슬래시** 이스케이프
  const escapedJSON = input
    // 백슬래시(\) -> \\ 로 이중화
    .replace(/\\/g, '\\\\')
    // 따옴표(") -> \" 로 이스케이프
    .replace(/"/g, '\\"');

  return new Promise((resolve, reject) => {
    // Python 명령어 실행
    exec(
      `python ${scriptPath} "${escapedJSON}"`,
      { maxBuffer: 1024 * 1024, encoding: 'utf-8' },
      (error, stdout, stderr) => {
        if (error) {
          console.error('Python script error:', stderr);
          reject(new Error(`Python script execution failed: ${stderr.trim()}`));
          return;
        }
        try {
          console.log('Raw Python Output:', stdout); // 여기서 한글이 깨지는지 확인
          const keywords = JSON.parse(stdout.trim());
          console.log('추출된 키워드:', keywords);
          resolve(keywords);
        } catch (parseError) {
          console.error('JSON 파싱 오류:', parseError);
          reject(new Error('Failed to parse Python script output.'));
        }
      },
    );
  });
};
/**
 * 키워드 추출 함수 (영어)
 */
const extractEnglishKeywords = (text: string): string[] => {
  const tokenizer = new natural.WordTokenizer();
  const cleanedText = removeHtmlTags(text);
  const words = tokenizer.tokenize(cleanedText);

  const stopWords = ['and', 'or', 'but', 'this', 'that', 'is', 'in', 'on'];
  return Array.from(
    new Set(
      words.filter(
        (word) =>
          word.length > 2 &&
          /^[a-zA-Z]+$/.test(word) &&
          !stopWords.includes(word.toLowerCase()),
      ),
    ),
  ).slice(0, 5); // 중복 제거 및 5개 제한
};

/**
 * 영어와 한국어 키워드 추출 함수
 */
export const extractKeywords = async (
  title: string,
  description: string,
): Promise<string[]> => {
  const combinedText = `${title} ${description}`;
  const [koreanKeywords, englishKeywords] = await Promise.all([
    extractKoreanKeywords(title, description),
    extractEnglishKeywords(combinedText), // 이미 정의된 함수
  ]);
  return Array.from(new Set([...koreanKeywords, ...englishKeywords])).slice(
    0,
    5,
  );
};

/**
 * 뉴스 데이터를 비동기로 처리
 */
const limitPromise = (() => {
  let limitInstance: any = null;
  return async () => {
    if (!limitInstance) {
      const { default: pLimit } = await import('p-limit');
      limitInstance = pLimit(3);
    }
    return limitInstance;
  };
})();

export const processNewsData = async (
  newsData: { title: string; description: string }[],
) => {
  const limit = await limitPromise();
  const tasks = newsData.map((news) =>
    limit(async () => {
      const keywords = await extractKeywords(news.title, news.description);
      console.log(`뉴스 제목: ${news.title}`);
      console.log(`키워드: ${keywords}`);
      return { ...news, keywords };
    }),
  );
  return Promise.all(tasks);
};
