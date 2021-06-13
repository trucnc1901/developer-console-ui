import { Box, Container, Typography } from '@material-ui/core';
import Status from 'common/constant/status';
import theme from 'common/theme';
import { useEffect } from 'react';
import { useCheckAuth } from 'react-admin';

const NotFound = () => {
  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box style={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src={Status.ERROR_404.image}
            style={{
              marginBottom: 30,
              display: 'inline-block',
              maxWidth: '100%',
              width: 400,
            }}
          />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h1">
          {Status.ERROR_404.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          {Status.ERROR_404.text}
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFound;
