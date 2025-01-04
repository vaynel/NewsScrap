import styled, { keyframes } from 'styled-components';

export const DetailContainer = styled.div`
  background: #f3f3f7;
  width: 100%;
  height: 100%;
  padding: 0;
  margin-right: 0;
`;

export const BackButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const NewsCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const NewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const NewsSummary = styled.p`
  font-size: 16px;
`;

export const NewsSource = styled.p`
  font-size: 14px;
  color: #888;
`;

export const Keywords = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const Keyword = styled.span`
  background: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  gap: 10px; /* 버튼 간 간격 */
  padding: 10px; /* 버튼 박스 상하좌우 여백 */
  position: static; /* 상단 고정을 위해 */
  top: 10px;
  right: 10px;
`;

export const IconButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0; /* 호버 시 색상 변경 */
  }

  &:active {
    background-color: #d0d0d0; /* 클릭 시 색상 변경 */
  }

  & > img {
    width: 20px;
    height: 20px;
  }
`;

/* S.IFrameContainer 스타일 */
export const IFrameContainer = styled.iframe`
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// 로딩 애니메이션 키프레임
const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 로딩 스피너 스타일
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.2); /* 회색 테두리 */
  border-top: 4px solid #000; /* 검은색 상단 테두리 */
  border-radius: 50%;
  animation: ${spinner} 1s linear infinite; /* 회전 애니메이션 */
`;

// 로딩 컨테이너 스타일
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모 컨테이너 높이 */
`;
