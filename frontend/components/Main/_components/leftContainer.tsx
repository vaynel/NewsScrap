'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/store';
import { hideNewsDetail, setPage } from '../../../stores/newsSlice';
import { NewsCard as NewsCardType } from '@/types/mainTyeps';
import * as S from './LeftContainer.styles';
import * as MS from '../Main.styles';
import BackIcon from '../../../public/icons/back-icon.png';
import FavoriteIcon from '../../../public/icons/favorite-icon.png';
import ShareIcon from '../../../public/icons/scrap-icon2.png';
import Image from 'next/image';
import NewsCard from './NewsCard';

export default function LeftContainer() {
  const dispatch = useDispatch();
  const { isDetailView, selectedNews, page, category } = useSelector(
    (state: RootState) => state.news,
  );
  const [newsCard, setNewsCard] = useState<NewsCardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/newsdata?page=${page}&limit=12${
          category !== '전체' ? `&category=${category}` : ''
        }`,
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const responseData = await response.json();
      const { data = [], totalPages } = responseData;
      setNewsCard((prevNews) => (page === 1 ? data : [...prevNews, ...data]));
      setHasMore(page < totalPages);
    } catch (error) {
      console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotLoading, setScreenshotLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchScreenshot = async () => {
      if (!selectedNews) return;

      setScreenshotLoading(true);
      const response = await fetch(
        `/api/screenshot?url=${encodeURIComponent(selectedNews.url)}`,
      );
      const data = await response.json();
      setScreenshot(data.screenshotUrl);
      setScreenshotLoading(false);
    };

    if (selectedNews?.url) {
      fetchScreenshot();
    }
  }, [selectedNews]); // ✅ 의존성 배열 수정

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      dispatch(setPage(page + 1));
    }
  }, [loading, hasMore, page, dispatch]); // ✅ useCallback으로 감싸기

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]); // ✅ 의존성 배열 수정

  const handleBack = () => {
    dispatch(hideNewsDetail());
  };

  if (isDetailView && selectedNews) {
    return (
      <MS.LeftContainer ref={containerRef}>
        <S.DetailContainer>
          <S.ButtonBox>
            <S.IconButton>
              <Image src={FavoriteIcon} alt="좋아요" width={20} height={20} />
            </S.IconButton>
            <S.IconButton>
              <Image src={ShareIcon} alt="스크랩" width={20} height={20} />
            </S.IconButton>
            <S.IconButton onClick={handleBack}>
              <Image src={BackIcon} alt="뒤로 가기" width={20} height={20} />
            </S.IconButton>
          </S.ButtonBox>
          {screenshotLoading ? (
            <S.LoadingContainer>
              <S.LoadingSpinner />
            </S.LoadingContainer>
          ) : (
            screenshot && (
              <div style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
                <Image
                  src={screenshot}
                  alt="Screenshot"
                  layout="responsive" // 부모 요소에 맞게 반응형으로 크기 조절
                  width={800} // 이미지 너비 (원본 크기 기준)
                  height={600} // 이미지 높이 (원본 크기 기준)
                  style={{ width: '100%', display: 'block' }} // 스타일 적용
                  unoptimized // Next.js 이미지 최적화를 비활성화
                />
              </div>
            )
          )}
          <S.NewsSource>
            <span>출처: </span>
            <a
              href={selectedNews.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              {selectedNews.url}
            </a>
          </S.NewsSource>
        </S.DetailContainer>
      </MS.LeftContainer>
    );
  }

  return (
    <MS.LeftContainer ref={containerRef}>
      <MS.NewsContainer>
        {newsCard.length > 0 ? (
          newsCard.map((news) => <NewsCard newsCard={news} key={news.id} />)
        ) : (
          <div>로딩 중 또는 데이터가 없습니다.</div>
        )}
      </MS.NewsContainer>
    </MS.LeftContainer>
  );
}
