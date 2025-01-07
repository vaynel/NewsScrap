'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { setCategory, setPage } from '../../stores/newsSlice'; // Redux 액션 추가
import * as S from './Nav.style';
import LoginModal from '../LoginModal/LoginModal';
import MainIcon from '../../public/images/paparpicImg.png';
import Image from 'next/image';

export default function Nav() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.news.category,
  ); // Redux 상태에서 카테고리 가져오기

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null); // 사용자 이름 상태

  const handleLogin = () => {
    setIsModalOpen(!isModalOpen);
  };

  const categories = ['전체', '연애', '정치', '스포츠', 'IT']; // 카테고리 목록

  // 카테고리 변경 처리
  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category)); // Redux 상태로 카테고리 설정
    dispatch(setPage(1)); // 페이지 초기화
  };

  // 로그인 상태 확인 (예: 로컬 스토리지나 API를 통해 확인)
  useEffect(() => {
    fetch('http://localhost:4000/api/users/profile', {
      credentials: 'include', // 쿠키를 요청에 포함
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('사용자 정보:', data);
        setUsername(data.user?.username || null);
      })
      .catch((error) => {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
      });
  }, []);

  // Login Modal 오픈하면 스크롤 비활성화
  useEffect(() => {
    if (isModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }

    // 컴포넌트 언마운트 시 body 상태 초기화
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, [isModalOpen]);

  return (
    <S.NavContainer>
      <Image width={50} height={41} src={MainIcon} alt="scrap icon" />
      <S.MyLink href="/">페이퍼픽</S.MyLink>
      <S.SecstionBox>
        {categories.map((section, index) => (
          <S.SectionNameSpan
            key={index}
            className={selectedCategory === section ? 'selected' : ''}
            onClick={() => handleCategoryChange(section)} // 클릭 시 Redux 상태 업데이트
          >
            {section}
          </S.SectionNameSpan>
        ))}
      </S.SecstionBox>

      {username ? (
        <S.Username>{username + '님'}</S.Username> // 로그인 시 사용자 이름 표시
      ) : (
        <S.LoginBtn onClick={handleLogin}>Login</S.LoginBtn> // 로그인 버튼 표시
      )}
      {isModalOpen && <LoginModal handleLogin={handleLogin} />}
    </S.NavContainer>
  );
}
