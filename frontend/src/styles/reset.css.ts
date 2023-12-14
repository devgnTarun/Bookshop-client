

import { globalStyle } from '@vanilla-extract/css';
import { vars } from './themes.css';

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  background: vars.colors.primary,
});

globalStyle("html:focus-within", {
  scrollBehavior: "smooth",
});

globalStyle("body", {
  minHeight: "100vh",
  textRendering: "optimizeSpeed",
  lineHeight: 1.5,
  
});

globalStyle("a", {
  textDecoration: "none",
  
});

globalStyle("img, picture", {
  maxWidth: "100%",
  display: "block",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
  
});
