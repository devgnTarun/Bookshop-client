import { createGlobalTheme } from '@vanilla-extract/css';

export const theme = createGlobalTheme(':root', {
  colors: {
    primary: 'black',
    secondary: 'green',
    background: '#f0f0f0', 
    text: '#333',
    link: 'blue', 
   
  },
  fonts: {
    primary: 'Arial, sans-serif',
    secondary: 'Helvetica, sans-serif',
    
  },
  space: {
    none: '0',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
    '6x': '48px',
  },
  fontSizes: {
    '1x': '8px',
    '2x': '12px',
    '3x': '16px',
    '4x': '20px',
    '5x': '24px',
    
  },
  fontWeights: {
    light: "300",
    normal: "500",
    bold: "600",
    bolder: "700",
  }
});

export const vars = { ...theme };
