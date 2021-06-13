import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import StorageKeys from 'common/constant/storage-keys';
import theme from 'common/theme';
import { getCookie } from 'components/common/Cookies';
import { GetProfile } from 'providers/authProvider';
import queryString from 'query-string';
import { useCheckAuth } from 'ra-core';
import { Link, Loading } from 'ra-ui-materialui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { REACT_APP_MINIAP_API_CONFIRM_REQUEST } = process.env;

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
  const checkAuth = useCheckAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const code = queryString.parse(location.search).code;
  useEffect(() => {
    const activateEmail = async () => {
      try {
        await fetch(`${REACT_APP_MINIAP_API_CONFIRM_REQUEST}?code=${code}`, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
            'Content-Type': 'application/json',
          }),
        });
        await GetProfile().then((value) => {
          const user = { ...value };
          localStorage.setItem(StorageKeys.PROFILE, JSON.stringify(user));
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setSuccess(true);
        console.log(error.message);
      }
    };
    activateEmail();
    checkAuth().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <Loading loadingPrimary="" loadingSecondary="Loading..." />;

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        {!success ? (
          <Box>
            <CheckCircleOutlinedIcon className={classes.icon} style={{ color: theme.palette.success.main }} />
            <Typography align="center" color="textPrimary" gutterBottom variant="h4">
              {status.success.message}
            </Typography>
            <Link to="/dashboard">
              <Button color="primary" variant="text">
                Go to dashboard
              </Button>
            </Link>
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
