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

  return (
    <>
      {/* {newsCard.map((newsCard) => ( */}
      <S.NewsCard key={newsCard.id} onClick={() => handleClick(newsCard)}>
        <S.NewsCardTop>
          <S.TopLeft>
            <S.NewsTitle>{newsCard.title}</S.NewsTitle>
            <S.NewsSource>{newsCard.url}</S.NewsSource>
          </S.TopLeft>
          {/* <S.TopRight>
              <S.TopBtn>
                <Image
                  width={20}
                  height={20}
                  src={ScrapIcon}
                  alt="scrap icon"
                />
              </S.TopBtn>
              <S.TopBtn>
                <Image
                  width={20}
                  height={20}
                  src={ShareIcon}
                  alt="share icon"
                />
              </S.TopBtn>
            </S.TopRight> */}
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
