import { style } from '@vanilla-extract/css';


export const notFoundContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '50px',
});


export const notFoundTitle = style({
  fontSize: '72px',
  fontWeight: 'bold',
  color: 'red',
});


export const notFoundSubtitle = style({
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'gray',
});


export const notFoundDescription = style({
  fontSize: '16px',
  color: 'gray',
  marginTop: '20px',
});


export const backButton = style({
  marginTop: '50px',
  fontWeight: 'bold',
});
