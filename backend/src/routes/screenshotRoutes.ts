import { Router } from 'express';
import * as C from '../controllers/screenshotController';

const router = Router();

// POST /api/screenshot - 여러 URL에 대해 스크린샷 생성
router.post('/', C.handleScreenshotRequest);
router.post('/oneNewsShot', C.ScreenshotRequestOneNews);

export default router;
