

import { style } from '@vanilla-extract/css';

export const popularBooks = style({
  
  margin: '20px auto', 
  maxWidth: '800px', 
});

export const carouselImage = style({
  maxWidth: '100%',
  maxHeight: '100%',
  
});

export const carouselCaption = style({
  textAlign: 'center',
 
  marginTop: '10px', 
});

export const bookTitle = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: '0',
  
});

export const bookAuthor = style({
  fontSize: '1rem',
  margin: '0',
 
});

export const carousel = style({
  
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
  
});
