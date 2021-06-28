import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getProfile } from 'services/api/httpClient';

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
  useEffect(() => {
    const id = setInterval(() => {
      const autoRefresh = async () => {
        await getProfile.requestApi().then((res) => {
          const { data } = res.data;
          const { email } = { ...data };
          if (email !== '') {
            history.push('/');
          }
        });
      };
      autoRefresh();
    }, 1000);
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
