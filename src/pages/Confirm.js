import { Box, Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useCheckAuth } from 'react-admin';

const imageURL = '/static/images/thankyou.jpg';
const NotFound = () => {
  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth().catch(() => {});
  }, []);
  return (
    <Box
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box style={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src={imageURL}
            style={{
              marginBottom: 30,
              display: 'inline-block',
              maxWidth: '100%',
              width: 400,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
