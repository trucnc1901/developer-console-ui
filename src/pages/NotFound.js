import { Box, Container, Typography } from '@material-ui/core';
import theme from '../common/theme';
import notfound from '../assets/images/not_found.png';
import CheckAuth from '../components/common/CheckAuth';

const NotFound = () => {
  CheckAuth();
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
      <Container maxWidth="xs">
        <Typography align="center" color="textPrimary" gutterBottom variant="h1">
          404: NotFound
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
        </Typography>
        <Box style={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src={notfound}
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
