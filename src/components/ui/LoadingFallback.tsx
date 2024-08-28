import { Box, CircularProgress } from '@mui/material';

const LoadingFallback: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
  </Box>
);

export default LoadingFallback;