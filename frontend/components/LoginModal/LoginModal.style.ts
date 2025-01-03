import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const LoginModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--whiteColor);
  padding: 70px 30px 50px;
  width: 380px;
  border-radius: 10px;
  box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.25);
`;

export const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const SignupBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-top: 1px solid #d0d0d0;
`;

export const ClooseBtn = styled.button`
  position: absolute;
  right: 30px;
  top: 20px;
  font-size: 22px;
  cursor: pointer;
`;

export const BtnText = styled.p`
  width: 100%;
`;

export const BtnCommonStyles = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d0d0d0;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #171515;
`;

export const KakaoBtn = styled(BtnCommonStyles)`
  background-color: #f9e000;
  border-color: #f9e000;
  &:hover {
    letter-spacing: 1px;
  }
`;

export const GithubBtn = styled(BtnCommonStyles)`
  &:hover {
    background-color: #d0d0d0;
    letter-spacing: 1px;
  }
`;
