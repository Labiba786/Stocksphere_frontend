import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

export const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        '*': {
          fontFamily: 'Ubuntu, sans-serif !important',
          boxSizing: 'border-box',
        },
        body: {
          fontFamily: 'Ubuntu, sans-serif !important',
          margin: 0,
          padding: 0,
        },
      }}
    />
  );
}; 