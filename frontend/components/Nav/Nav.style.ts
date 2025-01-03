import styled from 'styled-components';
import { MainContainer } from '../Common/Common.style';

export const NavContainer = styled(MainContainer)`
  height: 60px;
  align-items: center;
  border-bottom: 2px solid #a8a8a8;
  /* padding: 0 5px; */
  padding-right: 38px;
`;

export const MainImg = styled.img`
  width: 50px; /* 로고의 너비 */
  height: 50px; /* 로고의 높이 */
  background-image: url('/icons/paparpicImg.ico');
  background-size: contain; /* 이미지를 요소에 맞게 조정 */
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: center; /* 중앙 정렬 */
  outline: none; /* 아웃라인 제거 */
  border: none; /* 테두리 제거 */
  box-shadow: none; /* 그림자 제거 */
  appearance: none; /* 브라우저 기본 스타일 제거 */
  cursor: default; /* 기본 커서로 설정 */
`;

export const MyLink = styled.a`
  text-decoration: none;
  color: '#222222';
  outline: none;
  font-size: 24px;
  /* font-weight: bold; */

  &:visited {
    color: #222222; /* 방문 후에도 동일한 색상 유지 */
  }

  &:hover {
    color: #222222; /* 호버 시 색상 유지 */
  }

  &:focus {
    color: #222222; /* 포커스 시 색상 유지 */
  }

  &:active {
    color: #222222; /* 클릭 시 색상 유지 */
  }
`;

export const SecstionBox = styled.div`
  margin-left: 20px;
  display: flex;
`;

export const SectionNameSpan = styled.span`
  padding: 10px 10px 2px 10px;
  font-size: 14px;

  &:hover {
    color: #222222; /* 호버 시 색상 유지 */
    font-weight: bolder;
  }

  &.selected {
    color: #222222; /* 선택된 색상 */
    font-weight: bolder; /* 선택된 폰트 두께 */
  }
`;

export const LoginBtn = styled.button`
  text-decoration: none;
  color: var(--blackColor);
  outline: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto; /* 우측 정렬 */
`;

export const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #0070f3;
  margin-left: auto; /* 우측 정렬 */
`;
