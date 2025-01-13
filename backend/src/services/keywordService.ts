import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
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
  const scriptPath = path.resolve(__dirname, './keyword_extractor.py');

  const inputJson = JSON.stringify({ title, description });

  return new Promise((resolve, reject) => {
    // spawn 시 encoding 옵션을 넣지 않는다.
    // 그리고 as ChildProcessWithoutNullStreams 로 캐스팅
    const pyProcess = spawn('python', [scriptPath], {
      stdio: ['pipe', 'pipe', 'pipe'], // stdin, stdout, stderr
    }) as ChildProcessWithoutNullStreams;

    let stdoutData = '';
    let stderrData = '';

    // 필요하면 스트림 인코딩을 직접 지정
    pyProcess.stdout.setEncoding('utf-8');
    pyProcess.stderr.setEncoding('utf-8');

    pyProcess.stdout.on('data', (data) => {
      stdoutData += data;
    });

    pyProcess.stderr.on('data', (data) => {
      stderrData += data;
    });

    pyProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script failed:', stderrData);
        reject(new Error(stderrData.trim()));
        return;
      }
      try {
        // 여기서 stdoutData가 JSON을 담고 있어야 함
        const keywords = JSON.parse(stdoutData.trim());
        resolve(keywords);
      } catch (err) {
        console.error('JSON 파싱 오류:', err);
        reject(new Error('Failed to parse Python script output.'));
      }
    });

    // stdin으로 JSON 전달 후 종료
    pyProcess.stdin.write(inputJson);
    pyProcess.stdin.end();
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
