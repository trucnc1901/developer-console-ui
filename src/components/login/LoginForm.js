import { Avatar, Box, Button, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import theme from 'common/theme';
import Copyright from 'components/common/CopyRight';
import PropTypes from 'prop-types';
import React from 'react';
import { Notification } from 'react-admin';

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

const LoginForm = ({ loading, handleLogin }) => {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <form className={classes.paper} onSubmit={handleSubmit}>
          <Avatar className={classes.avatar}>
            <EmailRoundedIcon />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Log in
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Log in on the internal platform
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
      {loading && <Notification message="adsidahdkjdhajdh" variant="success" />}
    </ThemeProvider>
  );
};

LoginForm.propTypes = {
  loading: PropTypes.bool,
  handleLogin: PropTypes.func,
};

export default LoginForm;
