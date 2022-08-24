import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 11rem;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  user-select: none;
`;

export const CardInfo = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 1.1em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  &&:after {
    content: '';
    display: block;
    width: 100px;
    padding-top: 12px;
    border-bottom: 3px solid #2e2e2e;
  }
`;
