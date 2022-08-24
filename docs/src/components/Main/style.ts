import styled from 'styled-components';

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
  justify-content: center;
`;

export const SearchSection = styled.div`
  /* background-color: #e7e7e7; */
  text-align: center;
  padding: 2rem;
`;

export const SearchInput = styled.input`
  font-size: 18px;
  border: none;
  background: #fff;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23838D99' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
  background-repeat: no-repeat;
  background-position: 10px 10px;
  background-size: 20px 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  width: 400px;
  padding: 0.5em 1em 0.5em 2.5em;

  &&::placeholder {
    color: #838d99;
  }

  &&:focus {
    outline: none;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);
  }

  @media only screen and (max-width: 512px) {
    max-width: 240px;
  }
`;
