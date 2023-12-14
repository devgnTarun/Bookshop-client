import { style } from '@vanilla-extract/css';


export const privacyContainer = style({
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'justify',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
});


export const privacyTitle = style({
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '20px 0',
  color: 'var(--color-dark)',
});


export const privacyParagraph = style({
  fontSize: '16px',
  margin: '10px 0',
  color: 'var(--color-dark)',
});


