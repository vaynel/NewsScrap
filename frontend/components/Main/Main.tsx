'use client';
import React from 'react';
import { MainContainer } from '../Common/Common.style';
import * as S from './Main.styles';

import Keyword from './_components/Keyword';

import Search from './_components/Search';
import LeftContainer from './_components/leftContainer';

import { useKeywords } from '@/hooks/useKeywords';

export default function Main() {
  const { keywords, search, handleSubmit, handleSearch, handleDelete } =
    useKeywords(['스포츠', '정치', 'IT']);

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
        </S.RightContainer>
      </div>

      {/* 이 div는 스크롤 감지용 ref를 연결 */}
      {/* <div ref={loadMoreRef}></div> */}
    </MainContainer>
  );
}
