import path from 'path';
import fs from 'fs';
import { Cluster } from 'puppeteer-cluster';
import crypto from 'crypto';
import News from '../models/News';
import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import pino from 'pino';
import { error } from 'console';

// 로깅 설정
const logger = pino();

// 환경 변수 확인
const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'default-bucket';
const REGION = process.env.AWS_REGION || 'us-east-1';

if (!BUCKET_NAME || !REGION) {
  throw new Error(
    'AWS_BUCKET_NAME 또는 AWS_REGION 환경 변수가 설정되지 않았습니다.',
  );
} else {
  // logger.info(`BUCKET_NAME: ${BUCKET_NAME}`);
}

const s3 = new S3Client({ region: REGION });
const screenshotPath = path.join(__dirname, '../../public/screenshots');

// 스크린샷 디렉토리 확인 및 생성
if (!fs.existsSync(screenshotPath)) {
  fs.mkdirSync(screenshotPath, { recursive: true });
  logger.info(`스크린샷 디렉토리 생성: ${screenshotPath}`);
} else {
  logger.info('스크린샷 디렉토리 있습니다.');
}

// Puppeteer 클러스터 초기화
let cluster: Cluster<{ url: string; filePath: string }> | null = null;

const initializeCluster = async () => {
  if (!cluster) {
    cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 2, // 동시에 처리할 작업 수
      puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    // 클러스터 작업 정의
    cluster.task(async ({ page, data: { url, filePath } }) => {
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      );
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.setViewport({ width: 1280, height: 720 });
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`스크린샷 생성 완료: ${filePath}`);
    });
  }
};

// Puppeteer 클러스터 종료 처리
process.on('SIGINT', async () => {
  if (cluster) {
    await cluster.close();
    logger.info('Puppeteer 클러스터 종료 완료');
  }
  process.exit();
});

export const generateScreenshot = async (url: string): Promise<string> => {
  if (typeof url !== 'string') {
    throw new TypeError('The "url" argument must be a string.');
  }

  // URL 유효성 검사
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (!isValidUrl(url)) {
    throw new Error('Invalid URL format');
  }

  const hash = crypto.createHash('sha256').update(url).digest('hex');
  const fileName = `${hash}.png`;
  const s3Key = `screenshots/${fileName}`;

  // Step 1: S3에서 파일 존재 여부 확인
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }));
    logger.info('S3에서 파일이 이미 존재합니다.');

    // S3에 파일이 이미 있으면 URL 반환
    await News.update({ isScreenShot: true }, { where: { url } });
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`;
  } catch (err: any) {
    if (err.name !== 'NotFound') {
      logger.error('S3 파일 확인 중 오류 발생:', err);
      throw err;
    }
    logger.info('S3에 파일이 존재하지 않습니다. 새로 생성합니다.');
  }

  // Step 2: Puppeteer로 스크린샷 생성
  await initializeCluster();
  const tempFilePath = path.join(screenshotPath, fileName);
  if (!cluster) {
    throw new Error('Puppeteer 클러스터가 초기화되지 않았습니다.');
  }
  try {
    await cluster.execute({ url, filePath: tempFilePath });

    // Step 3: S3에 파일 업로드
    const fileContent = fs.readFileSync(tempFilePath);
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: 'image/png',
      CacheControl: 'public, max-age=31536000', // 1년 캐시
    };
    const uploadResult = await s3.send(new PutObjectCommand(uploadParams));
    logger.info('S3 업로드 성공:', uploadResult);

    // Step 4: 로컬 파일 삭제
    fs.unlinkSync(tempFilePath);
    logger.info(`로컬 파일 삭제 완료: ${tempFilePath}`);

    // Step 5: DB 업데이트 및 URL 반환
    await News.update({ isScreenShot: true }, { where: { url } });
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`;
  } catch (err) {
    logger.error('스크린샷 생성 또는 업로드 중 오류 발생:', err);
    throw err;
  }
};

export const generateScreenshotsForUrls = async (
  urls: string[],
): Promise<string[]> => {
  await initializeCluster();

  const results = await Promise.all(
    urls.map((url) =>
      generateScreenshot(url).catch((err) => {
        logger.error(`URL 처리 중 오류 발생: ${url}`, err);
        return `오류 발생: ${url}`;
      }),
    ),
  );
  return results;
};
