import { style, globalStyle } from '@vanilla-extract/css'

globalStyle('footer, a', {
  margin: 0,
  padding: 0,
  border: 0,
  font: 'inherit',
  verticalAlign: 'baseline',
  textDecoration: 'none',
})

// styles for my footer
export const footer = style({
  backgroundColor: 'gray',
  color: 'white',
  padding: '1rem 0',
  display: 'flex',
  justifyContent: 'space-between',
})

export const socialIcon = style({
  marginRight: '0.5rem',
  fontSize: '20px',
})

export const socialLink = style({
  color: 'var(--color-white)',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
})
