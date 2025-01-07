'use client';
import React from 'react';
import * as S from '../Main.styles';
import { NewsCard as NewsCardType } from '@/types/mainTyeps';
import { showNewsDetail } from '@/stores/newsSlice';

// redux store 설정
import { useDispatch } from 'react-redux';

type NewsCardProps = {
  newsCard: NewsCardType;
};

export default function NewsCard({ newsCard }: NewsCardProps) {
  const dispatch = useDispatch();

  const handleClick = (news: NewsCardType) => {
    dispatch(showNewsDetail(news)); // Redux 상태 업데이트
  };

  const decodeHtmlEntities = (text: string): string => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, 'text/html')
      .documentElement.textContent;
    return decodedString || text; // 디코딩된 값 반환
  };

  return (
    <S.NewsCard
      isScreenShot={newsCard.isScreenShot}
      key={newsCard.id}
      onClick={() => handleClick(newsCard)}
    >
      <S.NewsCardTop>
        <S.TopLeft>
          <S.NewsTitle>{decodeHtmlEntities(newsCard.title)}</S.NewsTitle>
        </S.TopLeft>
      </S.NewsCardTop>
      <S.NewsCardSummary>
        {decodeHtmlEntities(newsCard.description)}
      </S.NewsCardSummary>
      <S.KeywordsContainer>
        {newsCard.keywords &&
          newsCard.keywords.length > 0 &&
          newsCard.keywords.map((keyword, index) => (
            <S.KeywordBadge key={index}>{keyword}</S.KeywordBadge>
          ))}
      </S.KeywordsContainer>
    </S.NewsCard>
  );
}
