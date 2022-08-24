import GithubOriginal from 'devicons-react/lib/icons/GithubOriginal';
import styled from 'styled-components';

export const NavTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.875rem;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
`;

export const NavBanner = styled.div`
  width: 3rem;
  height: 3rem;
`;

export const NavGithub = styled(GithubOriginal)`
  width: 1.5rem;
  height: 1.5rem;
  size: 1.5rem;

  g {
    fill: #fff;
  }
`;
