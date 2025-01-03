'use client';
import React, { useState, useEffect } from 'react';
import { MainContainer } from '../Common/Common.style';
import * as S from './Main.styles';

import Keyword from './_components/Keyword';

import Search from './_components/Search';
import LeftContainer from './_components/leftContainer';

import { useKeywords } from '@/hooks/useKeywords';
import { useScroll } from '@/hooks/useScroll';

export default function Main() {
  const { keywords, search, handleSubmit, handleSearch, handleDelete } =
    useKeywords(['스포츠', '정치', 'IT']);
  //

  // useEffect(() => {
  //   // 더미 데이터에서 처음 12개만 로드
  //   setNewsCard(
  //     newsData.slice(0, loadedItems).filter((item) => item !== undefined)
  //   );
  // }, [loadedItems]);

  // const topRateNews = rankingData
  //   .sort((a, b) => b.views - a.views)
  //   .slice(0, 10);

  return (
    <MainContainer>
      <LeftContainer />
      <div style={{ width: '28%' }}>
        <S.RightContainer>
          {/* Search */}
          <Search
            handleSubmit={handleSubmit}
            search={search}
            handleSearch={handleSearch}
          />
          {/* Keyword */}
          <Keyword keywords={keywords} handleDelete={handleDelete} />
          {/* Ranking */}
          {/* <Ranking newsRanking={topRateNews} /> */}
        </S.RightContainer>
      </div>

      {/* 이 div는 스크롤 감지용 ref를 연결 */}
      {/* <div ref={loadMoreRef}></div> */}
    </MainContainer>
  );
}

// {/* <S.LeftContainer>
//         {/* Keyword */}
//         {/* <Keyword keywords={keywords} handleDelete={handleDelete} /> */}

//         {showNewsCard ? (
//           <S.NewsContainer>
//             {/* News Card */}
//             <NewsCard newsCard={newsCard} />
//           </S.NewsContainer> // 로그인 버튼 표시
//         ) : (
//           <S.NewsPage />
//         )}
//       </S.LeftContainer> */}
