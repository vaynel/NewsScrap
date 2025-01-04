import React from 'react';
import * as S from '../Main.styles';
import ScrapIcon from '../../../public/icons/scrap-icon.png';
import ShareIcon from '../../../public/icons/kakao-share-icon.png';
import Image from 'next/image';
import { NewsCard as NewsCardType } from '@/types/mainTyeps';
import { showNewsDetail } from '@/stores/newsSlice';

// redux store 설정
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/store';

type NewsCardProps = {
  newsCard: NewsCardType;
};

export default function NewsCard({ newsCard }: NewsCardProps) {
  const dispatch = useDispatch();
  const { isDetailView, selectedNews } = useSelector(
    (state: RootState) => state.news,
  );

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
    <>
      {/* {newsCard.map((newsCard) => ( */}
      <S.NewsCard key={newsCard.id} onClick={() => handleClick(newsCard)}>
        <S.NewsCardTop>
          <S.TopLeft>
            <S.NewsTitle>{decodeHtmlEntities(newsCard.title)}</S.NewsTitle>
            {/* <S.NewsSource>{newsCard.url}</S.NewsSource> */}
          </S.TopLeft>
        </S.NewsCardTop>
        <S.NewsCardSummary>
          {decodeHtmlEntities(newsCard.description)}
        </S.NewsCardSummary>
        {/* <S.NewsCardBottom>
            {newsCard.keywords.map((keyword) => (
              <S.NewsCardKeyword key={keyword}>{keyword}</S.NewsCardKeyword>
            ))}
          </S.NewsCardBottom> */}
      </S.NewsCard>
      {/* ))} */}
    </>
  );
  return (
    <>
      {/* {newsCard.map((newsCard) => ( */}
      <S.NewsCard
        key={newsCard.id}
        onClick={() => window.open(newsCard.url, '_blank')}
      >
        <S.NewsCardTop>
          <S.TopLeft>
            <S.NewsTitle>{newsCard.title}</S.NewsTitle>
            {/* <S.NewsSource>{newsCard.url}</S.NewsSource> */}
          </S.TopLeft>
        </S.NewsCardTop>
        <S.NewsCardSummary>{newsCard.description}</S.NewsCardSummary>
        {/* <S.NewsCardBottom>
            {newsCard.keywords.map((keyword) => (
              <S.NewsCardKeyword key={keyword}>{keyword}</S.NewsCardKeyword>
            ))}
          </S.NewsCardBottom> */}
      </S.NewsCard>
      {/* ))} */}
    </>
  );
}
