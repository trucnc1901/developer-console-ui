import { Box, Container, Typography, Button } from '@material-ui/core';
import Status from 'common/constant/status';
import theme from 'common/theme';

const NotFound = () => {
  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '80px',
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
        <Typography align="center" color="textPrimary" variant="subtitle1" gutterBottom>
          {Status.ERROR_404.text}
        </Typography>
        <Button variant="text" color="primary" href="/login">
          Back to homepage
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
