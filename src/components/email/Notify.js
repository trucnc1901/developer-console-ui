import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useProfile } from 'hook/useProfile';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const imageURL = '/static/images/confirm.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    marginBottom: 16,
    display: 'inline-block',
    maxWidth: '100%',
    width: 150,
  },
}));

const Notify = () => {
  const classes = useStyles();
  const history = useHistory();
  const { data, profile } = useProfile();
  useEffect(() => {
    const id = setInterval(() => {
      profile();
    }, 10000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (data && data.email !== '') {
    history.push('/');
  }
  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Box>
          <img className={classes.image} alt="Under development" src={imageURL} />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">
          Check your email to activate your account.
        </Typography>
        <Button href="/" color="primary" variant="text">
          Go to dashboard
        </Button>
      </Container>
    </Box>
  );
};

export default Notify;
