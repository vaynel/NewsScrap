import Image from 'next/image';
import styled from 'styled-components';
import { MainContainer } from '../Common/Common.style';

// left
export const LeftContainer = styled.div`
  width: 74%;
  /* margin-right: 38px; */
  /* padding-top: 38px; */

  /* 스크롤 활성화 */
  overflow-y: auto;

  /* 스크롤바 숨김 (웹킷 기반 브라우저) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 스크롤바 숨김 (Firefox) */
  scrollbar-width: none;

  /* 스크롤 가능한 영역 제한 */
  max-height: 100%;
`;

// keyword
export const KeywordContainer = styled(MainContainer)`
  font-size: 12px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 0px;
  margin: 0px;
  align-content: flex-start;
  margin-top: 22px;
  /* margin: 0; */
`;
export const Keyword = styled.span`
  margin-right: 15px;
  border: 1px solid #c3ea97;
  background-color: #c3ea97;
  padding: 4px 4px 4px 12px;
  font-size: 14px;
  /* padding: 4px; */
  border-radius: 12px;
  margin-top: 10px;
`;
export const DeleteBtn = styled.button`
  margin-left: 2px;
  margin-right: 4px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;

// news
export const NewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 37px;
  padding-right: 38px;
  /* margin-top: 15px; */
`;

export const NewsCard = styled.div`
  border: 1px solid var(--blackColor);
  /* width: 420px; */
  /* height: 240px; */
  border-radius: 20px;
  width: 32%;
  padding: 15px 15px 70px 15px;
  margin-bottom: 2%;
  background-color: #d9d9d9;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: visible;

  cursor: pointer; /* 클릭 가능한 스타일 */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* 클릭 애니메이션 */

  &:hover {
    transform: translateY(-2px); /* 마우스 오버 시 위로 이동 */
    box-shadow: 4px 8px 10px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
    z-index: 1000;
  }
`;

// news top
export const NewsCardTop = styled.div`
  display: flex;
  align-items: top;
  width: 100%;
`;
export const TopLeft = styled.div`
  width: 80%;
`;
export const NewsSource = styled.span`
  font-size: 12px;
  visibility: hidden;
`;
export const NewsTitle = styled.h2`
  font-size: 13px;
  margin-top: 5px;
  width: 100%;
  white-space: nowrap; // text 1줄로 유지
  overflow: hidden; // 넘치는 text 숨기기
  text-overflow: ellipsis; // 넘치는 text ...으로 표시
`;

export const TopRight = styled.div`
  width: 20%;
  font-size: 14px;
  display: flex;
  justify-content: right;
`;
export const TopBtn = styled.button`
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding-left: 4px;
  &:hover {
    transform: scale(1.1);
  }
`;

// news description
export const NewsCardSummary = styled.div`
  margin-top: 10px;
  border-top: 1px solid var(--blackColor);
  padding-top: 10px;
  font-size: 15px;
  line-height: 1.2;
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 3; // 3줄로 제한
  -webkit-box-orient: vertical; // 세로 방향으로 자르기
  overflow: hidden; // 넘치는 text 숨기기
  text-overflow: ellipsis; //넘치는 text ...로 표시
`;

// news bottom
export const NewsCardBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  border-radius: 0 0 20px 20px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  /* background-color: var(--secondaryColor); */
`;
export const NewsCardKeyword = styled.span`
  font-size: 12px;
  margin-right: 10px;
  background-color: var(--secondaryColor);
  padding: 6px 10px 6px 10px;
  border-radius: 10px;
  border: 1px solid;
`;

// right
export const RightContainer = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* start는 flex-start로 변경 */
  padding: 38px 50px 0 38px; /* padding을 축약 표현으로 변경 */
  padding: 38px;
  overflow: hidden; /* 스크롤 방지 */
  border-left: 2px solid #a8a8a8;
`;
export const SerachForm = styled.form`
  width: 100%;
  position: relative;
`;
export const SearchInput = styled.input`
  width: 100%;
  border: 1px solid var(--blackColor);
  font-size: 16px;
  padding: 5px 30px 5px 15px;
  border-radius: 10px;
  outline: none;
`;
export const SearchIcon = styled(Image)`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 8px;
  right: 10px;
`;

// ranking
export const RightTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
`;
export const RankingContainer = styled.div`
  border: 1px solid var(--blackColor);

  margin-top: 15px;
  border-radius: 15px;
  padding: 30px 0;
  background-color: #d9d9d9;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.25);
`;
export const RankingBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  padding-top: 20px;
`;
export const RankingText = styled.span`
  text-align: center;
  font-size: 14px;
`;

export const NewsRanking = styled(RankingText)`
  width: 15%;
`;
export const RankingTitle = styled(RankingText)`
  width: 55%;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 1줄만 표시
  -webkit-box-orient: vertical;
  overflow: hidden; // 넘치는 텍스트 숨김
  text-overflow: ellipsis; // 넘치는 텍스트 ...로 표시
`;
export const RankingViews = styled(RankingText)`
  width: 15%;
`;

// LoadingMessage
export const LoadingMessage = styled.span`
  font-size: 20px;
`;

export const NewsPage = styled.div``;
