import { Avatar, Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import theme from 'common/theme';
import Copyright from 'components/common/CopyRight';
import PropTypes from 'prop-types';
import React from 'react';

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
    padding: theme.spacing(4),
    maxWidth: '350px',
    width: '100%',
    minHeight: '250px',
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

const AuthForm = (props) => {
  const { REACT_APP_MINIAP_API_BASE_URL } = process.env;
  const classes = useStyles();

  const redirectLogin = (e) => {
    e.preventDefault();
    const oauth2Endpoint = 'https://oauth.zaloapp.com/v3/permission';
    const cbURL = window.location.href;
    const params = {
      app_id: '499973553904625500',
      redirect_uri: `${REACT_APP_MINIAP_API_BASE_URL}/login/callback`,
      state: encodeURIComponent(cbURL),
    };
    const url = `${oauth2Endpoint}?app_id=${params.app_id}&redirect_uri=${params.redirect_uri}&state=${params.state}f=1`;
    setTimeout(() => {
      window.location = url;
    }, 600);
  };

  // useEffect(() => {
  //   setCookie('_stt', params.state, 2);
  // }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CodeRoundedIcon />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Authorization
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Log in on the internal platform
          </Typography>
          <Button
            onClick={redirectLogin}
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login by Zalo
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

AuthForm.propTypes = {
  loading: PropTypes.bool,
  handleAuth: PropTypes.func,
};

export default AuthForm;
