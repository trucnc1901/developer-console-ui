import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import StorageKeys from 'common/constant/storage-keys';
import theme from 'common/theme';
import queryString from 'query-string';
import { Loading } from 'ra-ui-materialui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProfile, userConfirm } from 'services/api/httpClient';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: 8,
  },
}));

const status = {
  success: {
    message: 'You have successfully verified your email!',
  },
  error: {
    message: 'An error occurred, please try again',
  },
};

const EmailActive = () => {
  const classes = useStyles();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const code = queryString.parse(location.search).code;
  useEffect(() => {
    const activateEmail = async () => {
      await userConfirm
        .requestApi(code)
        .then(() => {
          setLoading(false);
          getProfile.requestApi.then((res) => {
            const { data } = res.data;
            localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(data));
          });
        })
        .catch((err) => {
          console.log(err.message);
          setSuccess(false);
          setLoading(false);
        });
    };
    activateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <Loading loadingPrimary="Loading" />;
  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        {success ? (
          <Box>
            <CheckCircleOutlinedIcon className={classes.icon} style={{ color: theme.palette.success.main }} />
            <Typography align="center" color="textPrimary" gutterBottom variant="h4">
              {status.success.message}
            </Typography>
            <Button href="/" color="primary" variant="text">
              Go to dashboard
            </Button>
          </Box>
        ) : (
          <Box>
            <CancelOutlinedIcon className={classes.icon} style={{ color: theme.palette.error.main }} />
            <Typography align="center" color="textPrimary" gutterBottom variant="h4">
              {status.error.message}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EmailActive;
