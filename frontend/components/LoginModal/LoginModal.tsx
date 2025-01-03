import React from 'react';
import * as S from './LoginModal.style';
import Image from 'next/image';
import KakaoIcon from '../../public/icons/kakao-share-icon.png';
import GithubIcon from '../../public/icons/github-icon.png';

interface ModalProps {
  handleLogin: () => void;
}
export default function LoginModal({ handleLogin }: ModalProps) {
  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 API 엔드포인트로 이동
    window.location.href = 'http://localhost:4000/auth/kakao';
  };

  return (
    <S.LoginContainer>
      <S.LoginModal>
        <S.ClooseBtn onClick={handleLogin}>X</S.ClooseBtn>
        <S.LoginBtnBox>
          <S.KakaoBtn onClick={handleKakaoLogin}>
            <Image src={KakaoIcon} alt="kakao icon" />
            <S.BtnText>KaKao Login</S.BtnText>
          </S.KakaoBtn>
          <S.GithubBtn>
            <Image src={GithubIcon} alt="github icon" />
            <S.BtnText>Github Login</S.BtnText>
          </S.GithubBtn>
        </S.LoginBtnBox>
        <S.SignupBtnBox>
          <S.KakaoBtn>
            <Image src={KakaoIcon} alt="kakao icon" />
            <S.BtnText>KaKao Signup</S.BtnText>
          </S.KakaoBtn>
          <S.GithubBtn>
            <Image src={GithubIcon} alt="github icon" />
            <S.BtnText>Github Signup</S.BtnText>
          </S.GithubBtn>
        </S.SignupBtnBox>
      </S.LoginModal>
    </S.LoginContainer>
  );
}
