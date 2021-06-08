import { Avatar, Box, Button, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import PropTypes from 'prop-types';
import React from 'react';
import { Notification } from 'react-admin';
import theme from '../../common/theme';
import Copyright from '../common/CopyRight';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 12px 40px rgb(0 0 0 / 12%)',
    borderRadius: '16px',
    padding: '24px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
    textTransform: 'initial',
  },
}));

const { REACT_APP_MINIAP_API_BASE_URL } = process.env;
const oauth2Endpoint = 'https://oauth.zaloapp.com/v3/permission';
const params = {
  app_id: '499973553904625500',
  redirect_uri: `${REACT_APP_MINIAP_API_BASE_URL}/login/callback`,
  state: 'https://dev-console.zalopay.vn',
};

const AuthForm = ({ loading, handleAuth }) => {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${oauth2Endpoint}?app_id=${params.app_id}&redirect_uri=${params.redirect_uri}&state=${params.state}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    });
    handleAuth();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <form className={classes.paper} onSubmit={handleSubmit}>
          <Avatar className={classes.avatar}>
            <CodeRoundedIcon />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Authorization
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Login Zalo to continue.
          </Typography>
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={loading && <CircularProgress color="inherit" size="20px" />}
          >
            Login by Zalo
          </Button>
        </form>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Notification />
    </ThemeProvider>
  );
};

AuthForm.propTypes = {
  loading: PropTypes.bool,
  handleAuth: PropTypes.func,
};

export default AuthForm;
