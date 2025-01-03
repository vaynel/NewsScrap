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
