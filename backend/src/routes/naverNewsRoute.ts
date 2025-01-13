import express from 'express';
import News from '../models/News';
import Keyword from '../models/Keywords';
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

// 뉴스 데이터 가져오기 (카테고리 필터 추가)
router.get('/newsdata', async (req, res) => {
  console.log('get : /naver/newsdata');
  const { page = 1, limit = 10, category } = req.query; // 카테고리 추가

  console.log(req.query);
  console.log('요청 파라미터:', req.query);
  if (category) console.log(category);
  else console.log('cagetory 없음');
  const offset =
    (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

  try {
    const whereClause = category
      ? { category: category as string } // 카테고리가 있으면 필터 적용
      : {};

    const newsData = await News.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit as string, 10),
      offset,
      order: [['pubDate', 'DESC']], // 최신 뉴스 순으로 정렬
      include: [
        {
          model: Keyword, // 키워드 데이터를 포함
          as: 'keywords', // 관계 정의에서 설정한 alias와 동일해야 함
          attributes: ['id', 'keyword'], // 필요한 필드만 선택
        },
      ],
    });
    // console.log(newsData);

    res.json({
      data: newsData.rows.map((news) => ({
        ...news.toJSON(),
        // 키워드 배열로 변환
      })),
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
