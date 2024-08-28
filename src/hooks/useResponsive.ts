import { useMediaQuery, useTheme } from '@mui/material';

export const useResponsive = () => {
  const theme = useTheme();
  
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return {
    isTablet
  };
};