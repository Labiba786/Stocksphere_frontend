import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

export const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      '*': {
        fontFamily: "'Ubuntu', sans-serif !important",
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      'html, body': {
        width: '100%',
        height: '100%',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'rgba(99, 102, 241, 0.5)',
        borderRadius: '4px',
        '&:hover': {
          background: 'rgba(99, 102, 241, 0.7)',
        },
      },
      '.MuiTypography-root': {
        transition: 'color 0.3s ease',
      },
      '.dark-mode': {
        '& ::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        '& ::-webkit-scrollbar-thumb': {
          background: 'rgba(99, 102, 241, 0.3)',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.5)',
          },
        },
      },
    }}
  />
);