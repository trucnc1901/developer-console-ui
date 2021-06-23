import { Box, Button, Container, Typography } from '@material-ui/core';
import Status from 'common/constant/status';
import theme from 'common/theme';
import { useHistory, useLocation } from 'react-router-dom';

const Error = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { state } = { ...location };
  const handleClick = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '80px',
      }}
    >
      <Container maxWidth="md">
        <Box style={{ textAlign: 'center' }}>
          <img
            alt=""
            src={
              (state !== {} && state.code === 400 ? Status.ERROR_400.image : Status.MAINTENANCE.image) ||
              (state !== {} && state.code === 401 ? Status.ERROR_401.image : Status.MAINTENANCE.image) ||
              (state !== {} && state.code === 404 ? Status.ERROR_404.image : Status.MAINTENANCE.image) ||
              (state !== {} && state.code === 500 ? Status.ERROR_500.image : Status.MAINTENANCE.image)
            }
            style={{
              marginBottom: 30,
              display: 'inline-block',
              maxWidth: '100%',
              width: 350,
            }}
          />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h2">
          {state !== {} ? state.code + ': ' + state.status : 'Could not request api from resource'}
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle1" gutterBottom>
          {state !== {} ? state.message : 'Try again'}
        </Typography>
        <Button variant="text" color="primary" onClick={handleClick}>
          Go back
        </Button>
      </Container>
    </Box>
  );
};

export default Error;
