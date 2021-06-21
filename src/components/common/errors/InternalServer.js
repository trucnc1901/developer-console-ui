import { Box, Button, Container, Typography } from '@material-ui/core';
import Status from 'common/constant/status';
import theme from 'common/theme';
import { useHistory } from 'react-router-dom';

const InternalServer = (props) => {
  const history = useHistory();
  const handleClick = () => {
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
        marginTop: '80px',
      }}
    >
      <Container maxWidth="md">
        <Box style={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src={Status.ERROR_500.image}
            style={{
              marginBottom: 30,
              display: 'inline-block',
              maxWidth: '100%',
              width: 350,
            }}
          />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h2">
          {Status.ERROR_500.title}
        </Typography>
        <Button variant="text" color="primary" onClick={handleClick}>
          Go back
        </Button>
      </Container>
    </Box>
  );
};

export default InternalServer;
