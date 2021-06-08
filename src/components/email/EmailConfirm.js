import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
  textfiled: {
    marginTop: theme.spacing(1),
  },
}));

const EmailConfirm = ({ loading, handleEmailConfirm }) => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    var code = e.target.value;
    setCode(code);
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (!code) {
      setError(true);
      return false;
    }
    handleEmailConfirm(code);
  };

  return (
    <ThemeProvider theme={theme}>
      {error && <Alert severity="error">Please enter code</Alert>}
      <Container component="main" maxWidth="sm" className={classes.root}>
        <form className={classes.paper} onSubmit={verifyCode}>
          <Avatar className={classes.avatar}>
            <CodeRoundedIcon />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Verify
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Please enter code
          </Typography>
          <TextField
            value={code}
            onChange={handleChange}
            className={classes.textfiled}
            id="outlined-basic"
            label="Code"
            variant="outlined"
            fullWidth
          />
          <span>{error}</span>
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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

EmailConfirm.propTypes = {
  loading: PropTypes.bool,
  handleEmailConfirm: PropTypes.func,
};

EmailConfirm.defaultProps = {
  handleEmailConfirm: null,
};

export default EmailConfirm;
