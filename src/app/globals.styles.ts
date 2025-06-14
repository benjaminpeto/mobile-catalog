'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
  --background: #ffffff;
  --foreground: #000000;
  --negro-titanium: #62605F;
  --violeta-titanium: #4D4E5F;
  --gris-titanium: #ACA49B;
  --amarillo-titanium: #F0E1B9;
  --font-helvetica: Helvetica, Arial, sans-serif;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: var(--foreground);
  background: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: var(--font-helvetica);
  font-weight: 300;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
`;
