'use client';
import React, { useEffect, useState } from 'react';
import * as S from './Nav.style';
import LoginModal from '../LoginModal/LoginModal';

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Login Modal 오픈하면 스크롤 X
  useEffect(() => {
    if (isModalOpen) {
      // 스크롤바가 사라지지 않도록 padding-right을 추가하여 레이아웃이 움직이지 않도록 방지
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`; // 스크롤바 크기만큼 오른쪽 여백 추가
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0'; // 여백 초기화
    }

    // 컴포넌트 언마운트 시 body 상태 초기화
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0'; // 여백 초기화
    };
  }, [isModalOpen]);
  return (
    <S.NavContainer>
      <S.MyLink href="/">페이퍼픽</S.MyLink>
      <S.LoginBtn onClick={handleLogin}>Login</S.LoginBtn>
      {isModalOpen && <LoginModal handleLogin={handleLogin} />}
    </S.NavContainer>
  );
}
