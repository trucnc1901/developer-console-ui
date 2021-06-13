import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GetProfile } from 'providers/authProvider';
import { useEffect } from 'react';
import { useCheckAuth } from 'react-admin';
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

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();
  const checkAuth = useCheckAuth();
  useEffect(() => {
    const id = setInterval(() => {
      const autoRefresh = async () => {
        await GetProfile().then((value) => {
          if (value.email !== '') {
            history.push('/dashboard');
          }
        });
      };
      autoRefresh();
    }, 10000);
    checkAuth().catch(() => {});
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Box>
          <img className={classes.image} alt="Under development" src={imageURL} />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">
          Check your email to activate your account.
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFound;
