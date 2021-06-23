import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import Alert from '@material-ui/lab/Alert';
import StorageKeys from 'common/constant/storage-keys';
import theme from 'common/theme';
import { httpClient } from 'common/utils/request/common';
import { GetProfile } from 'components/common/request/GetProfile';
import queryString from 'query-string';
import { Link, Loading } from 'ra-ui-materialui';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const [error, setError] = useState();
  const code = queryString.parse(location.search).code;
  useEffect(() => {
    const activateEmail = async () => {
      const url = `${REACT_APP_MINIAP_API_CONFIRM_REQUEST}?code=${code}`;
      try {
        httpClient(url).then(({ status }) => {
          if (status === 401) {
            setError('Authorization required');
            setTimeout(() => {
              history.push('/login');
            }, 600);
          }
          GetProfile().then((value) => {
            const user = { ...value };
            localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(user));
          });
        });
        setLoading(false);
      } catch (error) {
        setSuccess(false);
      }
    };
    activateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
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
            <Link to="/">
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
