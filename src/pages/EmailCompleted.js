import { Box, Container, Typography } from '@material-ui/core';
import theme from '../common/theme';
import CheckAuth from '../components/common/CheckAuth';

const EmailCompleted = (props) => {
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
          Thank You!
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Please check your email to continue login to system!
        </Typography>
      </Container>
    </Box>
  );
};

EmailCompleted.propTypes = {};

export default EmailCompleted;
