'use client';
import React, { useState, useEffect } from 'react';
// redux store 설정
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/store';
import * as S from './MyPage.styles';

import Image from 'next/image';

export default function LeftContainer() {
  const dispatch = useDispatch();
  const { isDetailView, selectedNews } = useSelector(
    (state: RootState) => state.news,
  );

  return;
  <S.LeftContainer></S.LeftContainer>;
}
