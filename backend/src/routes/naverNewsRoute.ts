import express from 'express';
import News from '../models/News';
import { saveNewsWithKeywords } from '../controllers/newsController';

const router = express.Router();

router.post('/news', async (req, res) => {
  const { title, category, description, keywords } = req.body;

  if (!title || !category || !description || !keywords) {
    console.log('바디가 잘못됨');
    return;
  }

  try {
    await saveNewsWithKeywords({ title, category, description }, keywords);
    res.status(201).json({ message: 'News saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save news' });
  }
});

// 뉴스 데이터 가져오기
router.get('/newsdata', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // 기본값: 1페이지, 10개
  const offset =
    (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

  try {
    const newsData = await News.findAndCountAll({
      limit: parseInt(limit as string, 10),
      offset,
      order: [['pubData', 'DESC']], // 최신 뉴스 순으로 정렬
    });

    res.json({
      data: newsData.rows,
      total: newsData.count,
      currentPage: parseInt(page as string, 10),
      totalPages: Math.ceil(newsData.count / parseInt(limit as string, 10)),
    });
  } catch (error) {
    console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

export default router;
