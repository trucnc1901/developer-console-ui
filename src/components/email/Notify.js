import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GetProfile } from 'components/common/request/GetProfile';
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

const Notify = () => {
  const classes = useStyles();
  const history = useHistory();
  const checkAuth = useCheckAuth();
  useEffect(() => {
    const id = setInterval(() => {
      const autoRefresh = async () => {
        try {
          await GetProfile().then((value) => {
            if (value.email !== '') {
              history.push('/');
            }
          });
        } catch (error) {
          console.log(error);
        }
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

export default Notify;
