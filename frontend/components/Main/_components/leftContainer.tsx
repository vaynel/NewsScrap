'use client';
import React, { useState, useEffect } from 'react';
// redux store 설정
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
import axios from 'axios';

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

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prevPage) => prevPage + 1); // 다음 페이지 요청
    }
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (isDetailView && selectedNews) {
    return (
      <MS.LeftContainer>
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

          <S.NewsTitle>{selectedNews.title}</S.NewsTitle>
          <S.NewsSummary>{selectedNews.description}</S.NewsSummary>
          <S.NewsSource>{selectedNews.url}</S.NewsSource>
        </S.DetailContainer>
      </MS.LeftContainer>
    );
  }

  return (
    <MS.LeftContainer>
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
