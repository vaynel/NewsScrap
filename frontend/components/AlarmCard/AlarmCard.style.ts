import styled from "styled-components";

// 알람 카드 컨테이너 스타일
export const AlarmCardContainer = styled.div`
    position: fixed;
    bottom: 20px; /* 화면 하단에서 20px 위로 */
    right: 20px; /* 화면 우측에서 20px 왼쪽으로 */
    background-color: #ECEDFF; /* 배경 색상 */
    border: 2px solid #000000; /* 외곽선 */
    border-radius: 15px; /* 둥근 모서리 */
    padding: 15px 20px; /* 안쪽 여백 */
    // box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px; /* 고정된 너비 */
`;

// 메시지 텍스트 스타일
export const MessageText = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #333;
    margin: 0 0 10px 0;
    text-align: center;
`;

// 바로보기 버튼 스타일
export const ViewButton = styled.button`
    font-size: 14px;
    font-weight: 700;
    color: #000;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: center;
    &:hover {
        text-decoration: underline; /* 버튼 호버 시 밑줄 */
    }
`;
