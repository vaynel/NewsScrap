import path from 'path';
import fs from 'fs';
import { Cluster } from 'puppeteer-cluster';
import crypto from 'crypto';
import News from '../models/News';

const screenshotPath = path.join(__dirname, '../../public/screenshots');

// 클러스터 초기화
let cluster: Cluster<{ url: string; filePath: string }>;

const initializeCluster = async () => {
  if (!cluster) {
    cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 5, // 동시에 처리할 작업 수
      puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    // 클러스터 작업 정의
    cluster.task(async ({ page, data: { url, filePath } }) => {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.setViewport({ width: 1280, height: 720 });
      await page.screenshot({ path: filePath, fullPage: true });
    });
  }
};

export const generateScreenshot = async (url: string): Promise<string> => {
  if (typeof url !== 'string') {
    throw new TypeError('The "url" argument must be a string.');
  }

  const hash = crypto.createHash('sha256').update(url).digest('hex');
  const fileName = `${hash}.png`;
  const filePath = path.join(screenshotPath, fileName);

  // 파일이 이미 존재하면 바로 반환
  if (fs.existsSync(filePath)) {
    await News.update({ isScreenShot: true }, { where: { url } });
    return `http://localhost:4000/screenshots/${fileName}`; // 전체 URL 반환
  }

  await initializeCluster();

  // 클러스터 작업 추가
  await cluster.execute({ url, filePath });
  // 스크린샷 생성 후 isScreenShot 값을 true로 업데이트
  await News.update({ isScreenShot: true }, { where: { url } });
  return `http://localhost:4000/screenshots/${fileName}`; // 전체 URL 반환
};

// 여러 URL에 대해 병렬로 스크린샷 생성
export const generateScreenshotsForUrls = async (
  urls: string[],
): Promise<string[]> => {
  await initializeCluster();

  const results = await Promise.all(urls.map((url) => generateScreenshot(url)));
  return results;
};
