import styled from "styled-components";

export const Button = styled.div`
  width: 220px;
  background-color: rgb(25, 155, 215);
  color: white;
  font-weight: bold;
  padding: 20px;
  border-radius: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100vw;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
`;

export const ModalContent = styled.div`
  background: #050f1e;
  border-radius: 20px;
  width: 50%;
  height: 85%;
  margin-top: 3rem;
  line-height: 1.4;
`;

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(49, 49, 49, 0.8);
  z-index: 1;
  width: 100vw;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
`;

export const TopContainer = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
`;

export const TopElements = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 1px;
`;
