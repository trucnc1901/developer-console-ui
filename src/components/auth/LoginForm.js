import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { Notification, useLogin } from 'react-admin';
import theme from '../../common/theme';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function Login() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const login = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setLoading(true);
    }, 100);
    login();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Log in
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Log in on the internal platform
          </Typography>
          <Button
            onClick={handleSubmit}
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={!!loading && <CircularProgress color="inherit" size="20px" />}
          >
            Login
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Notification />
    </ThemeProvider>
  );
}
