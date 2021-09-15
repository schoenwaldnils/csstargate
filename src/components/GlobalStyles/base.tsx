import { css } from '@emotion/react'

import { colors } from '../../data/colors'

export const base = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    word-break: break-word;
  }

  *:focus {
    outline: solid 2px var(--Typography-focus);
  }

  html {
    /* stylelint-disable-next-line max-line-length */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 2vmin;
    font-weight: 400;
    line-height: 1.5;
    font-display: swap;

    @media (min-width: 720px) {
      font-size: 16px;
    }
  }

  body {
    font-size: 16px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.white};
    text-rendering: optimizeLegibility;
    background-color: ${colors.almostblack};
  }

  h1,
  h2,
  h3,
  h4,
  p,
  figure {
    margin: 0;
    font: inherit;
  }

  @media print {
    h1,
    h2,
    h3,
    h4 {
      page-break-after: avoid;
    }
  }

  img,
  figure,
  video,
  svg {
    max-width: 100%;
    height: auto;
  }

  button {
    color: inherit;
  }
`
