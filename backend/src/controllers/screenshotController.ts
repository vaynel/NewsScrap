import { Request, Response } from 'express';
import {
  generateScreenshotsForUrls,
  generateScreenshot,
} from '../services/screenshotService';

export const handleScreenshotRequest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    res.status(400).json({ error: 'URLs must be an array.' });
    return;
  }

  try {
    const screenshots = await generateScreenshotsForUrls(urls);
    res.status(200).json({ screenshots });
  } catch (error) {
    console.error('Error generating screenshots:', error);
    res.status(500).json({ error: 'Failed to generate screenshots.' });
  }
};

export const ScreenshotRequestOneNews = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { url } = req.body;
  console.log('요청한 url 스크린샷 :' + url);

  // URL이 없거나 타입이 올바르지 않은 경우
  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: '유효한 URL이 전달되지 않았습니다.' });
    return;
  }

  try {
    const screenshotUrl = await generateScreenshot(url); // 스크린샷 생성
    res.status(200).json({ screenshotUrl }); // 생성된 스크린샷 URL 반환
  } catch (error) {
    console.error('Error generating screenshot:', error);
    res.status(500).json({ error: '스크린샷 생성에 실패했습니다.' });
  }
};
