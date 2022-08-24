import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    margin: 0;
    font-family: "Montserrat", sans-serif;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
      width: 0.6rem;
      height: 0.6rem;
      background-color: #071013;
  }

  ::-webkit-scrollbar-thumb {
      background-color: #44575f;
  }

  .emoji {
    font-size: 3.5rem;
  }

  .notification-wrapper {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 300px;
    z-index: 999999;
  }

  .notification-item {
    box-shadow: 0 0 10px rgba(0,0,0, 0.3);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    animation: SlideLeft 0.4s;
    animation-fill-mode: forwards;
    width: 300px;
    background-color: #fff;
  }

  @keyframes SlideLeft {
    0% {
      margin-left: 120%;
    }

    100% {
      margin-left: 0;
    }
  }

  @keyframes SlideRight {
    0% {
      margin-left: 0;
    }

    100% {
      margin-left: 120%;
    }
  }

  .notification-item.exit {
    animation: SlideRight 0.4s;
    animation-fill-mode: forwards;
  }

  .notification-item p {
    margin: 0;
    padding: 10px;
  }

  .notification-item .bar {
    height: 10px;
  }

  .notification-item.success .bar {
    background-color: #65d266;
  }

  .notification-item.error .bar {
    background-color: red;
  }

  .hljs {
  display: block;
  overflow-x: auto;
  padding: .5em;
  background: #282a36;
  border: 0;
}

.hljs-keyword,
.hljs-link,
.hljs-literal,
.hljs-section,
.hljs-selector-tag {
  color: #8be9fd
}

.hljs-function .hljs-keyword {
  color: #ff79c6
}

.hljs,
.hljs-subst {
  color: #f8f8f2
}

.hljs-addition,
.hljs-attribute,
.hljs-bullet,
.hljs-name,
.hljs-string,
.hljs-symbol,
.hljs-template-tag,
.hljs-template-variable,
.hljs-title,
.hljs-type,
.hljs-variable {
  color: #f1fa8c
}

.hljs-comment,
.hljs-deletion,
.hljs-meta,
.hljs-quote {
  color: #6272a4
}

.hljs-doctag,
.hljs-keyword,
.hljs-literal,
.hljs-name,
.hljs-section,
.hljs-selector-tag,
.hljs-strong,
.hljs-title,
.hljs-type {
  font-weight: 700
}

.hljs-emphasis {
  font-style: italic
}

  .iconfont-regular {
    font-family: "fluentui-emoji-regular" !important;
    font-size: 26px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

`;

export const Grid = styled.div`
  display: grid;
`;

export const Container = styled.div`
  /* max-width: 1200px;
  margin: 0 auto; */
`;

export const Banner = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-bottom: 3rem;

  h1 {
    font-size: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      font-size: 0.8rem;
    }
  }
`;

export const Discreption = styled.p`
  /* max-width: 30rem; */
  margin-top: 2rem;
`;

export const Installation = styled.section`
  margin-top: 3rem;

  h2 {
    font-size: 1.5rem;

    ::after {
      content: '';
      display: block;
      width: 100px;
      padding-top: 6px;
      border-bottom: 3px solid rgb(46, 46, 46);
    }
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  /* max-width: 30rem; */
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export const CardInfo = styled.div`
  padding: 2.5em 3em;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 1.5em;

  &&:after {
    content: '';
    display: block;
    width: 100px;
    padding-top: 12px;
    border-bottom: 3px solid #2e2e2e;
  }
`;
