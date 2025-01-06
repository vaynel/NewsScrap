'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/store';
import { hideNewsDetail } from '../../../stores/newsSlice';
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
  const { isDetailView, selectedNews } = useSelector(
    (state: RootState) => state.news,
  );

  const handleBack = () => {
    dispatch(hideNewsDetail()); // 목록으로 돌아가기
  };

  const [newsCard, setNewsCard] = useState<NewsCardType[]>([]);
  const [page, setPage] = useState<number>(1); // 페이지 번호
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 추가 데이터 여부

  const fetchNews = async (currentPage: number) => {
    try {
      setLoading(true); // 로딩 상태 시작

      const response = await fetch(
        `/api/newsdata?page=${currentPage}&limit=12`,
      );
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const responseData = await response.json();

      console.log(responseData);

      const { data = [], totalPages } = responseData; // 기본값으로 빈 배열 설정
      const urls = data.map((news: NewsCardType) => news.url); // URL 추출

      setNewsCard((prevNews) => [...prevNews, ...data]); // 기존 데이터에 추가
      setHasMore(currentPage < totalPages); // 다음 페이지가 있는지 확인
      setLoading(false); // 로딩 상태 종료
    } catch (error) {
      console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
      setLoading(false);
    }
  };

  // 초기 데이터 로드 및 페이지 변경 시 데이터 요청
  useEffect(() => {
    if (hasMore) fetchNews(page);
  }, [page]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // 스크린샷을 이용한 상세 뉴스 보기
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotLoading, setScreenshotLoading] = useState<boolean>(false); // 스크린샷 로딩 상태

  useEffect(() => {
    const fetchScreenshot = async () => {
      if (!selectedNews) return;

      setScreenshotLoading(true); // 스크린샷 로딩 상태 시작
      const response = await fetch(
        `/api/screenshot?url=${encodeURIComponent(selectedNews.url)}`,
      );
      const data = await response.json();
      setScreenshot(data.screenshotUrl); // 스크린샷 URL 저장
      setScreenshotLoading(false); // 로딩 상태 종료
    };

    if (selectedNews?.url) {
      fetchScreenshot();
    }
  }, [selectedNews?.url]);

  // 무한 스크롤 이벤트 핸들러
  const containerRef = useRef<HTMLDivElement | null>(null); // 타입 명시

  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

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
            // 로딩 중 애니메이션 표시
            <S.LoadingContainer>
              <S.LoadingSpinner />
            </S.LoadingContainer>
          ) : (
            screenshot && (
              // 스크린샷 표시 (가로에 맞추고 세로 스크롤 가능)
              <div style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
                <img
                  src={screenshot}
                  alt="Screenshot"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            )
          )}
          {/* 출처 표시 */}
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
