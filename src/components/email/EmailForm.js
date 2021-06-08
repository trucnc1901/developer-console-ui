import { Avatar, Box, Button, Container, TextField, Typography, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import EmailRounded from '@material-ui/icons/EmailRounded';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Notification } from 'react-admin';
import theme from '../../common/theme';
import validator from 'validator';
import Copyright from '../common/CopyRight';
import Snackbar from '@material-ui/core/Snackbar';

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
  textfiled: {
    marginTop: theme.spacing(1),
  },
  disable: {
    pointerEvents: 'none',
  },
}));

const EmailForm = ({ loading, handleEmail }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    var email = e.target.value;
    setEmail(email);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setEmailError(false);
  };

  const getEmail = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      setEmailError(false);
      setSuccess(true);
      handleEmail(email);
      return;
    } else {
      setEmailError(true);
      return false;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={emailError} autoHideDuration={4000} onClose={handleCloseToast}>
        <Alert variant="filled" onClose={handleCloseToast} severity="error">
          Please re-enter your email!
        </Alert>
      </Snackbar>

      <Snackbar open={success} onClose={handleCloseToast}>
        <Alert variant="filled" onClose={handleCloseToast} severity="success">
          You have sent email successfully
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <form className={classes.paper} onSubmit={getEmail}>
          <Avatar className={classes.avatar}>
            <EmailRounded />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Verify
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Please enter your email to continue
          </Typography>
          <TextField
            value={email}
            onChange={handleChange}
            className={classes.textfiled}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} ${success && classes.disable}`}
            startIcon={loading && <CircularProgress color="inherit" size="20px" />}
          >
            Continue
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

EmailForm.propTypes = {
  loading: PropTypes.bool,
  handleEmail: PropTypes.func,
};

EmailForm.defaultProps = {
  handleEmail: null,
};

export default EmailForm;
