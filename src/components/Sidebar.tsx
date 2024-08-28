import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paper, Button, Box } from '@mui/material';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Paper 
      elevation={3} 
      component={Box}
      height={'100%'}
      padding={2}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          fullWidth
          component={Link}
          to="/"
          color={location.pathname === '/' ? 'primary' : 'inherit'}
          variant={location.pathname === '/' ? 'contained' : 'text'}
        >
          Give consent
        </Button>
        <Button
          fullWidth
          component={Link}
          to="/consents"
          color={location.pathname === '/consents' ? 'primary' : 'inherit'}
          variant={location.pathname === '/consents' ? 'contained' : 'text'}
        >
          Collected consents
        </Button>
      </Box>
    </Paper>
  );
};

export default Sidebar;