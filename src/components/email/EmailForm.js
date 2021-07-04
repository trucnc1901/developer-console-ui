import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import EmailRounded from '@material-ui/icons/EmailRounded';
import theme from 'common/theme';
import Copyright from 'components/common/CopyRight';
import PropTypes from 'prop-types';
import React from 'react';
import { Notification } from 'react-admin';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
  textfiled: {
    marginTop: theme.spacing(1),
  },
  disable: {
    pointerEvents: 'none',
  },
  error: {
    textAlign: 'left',
    width: '100%',
  },
}));

const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Please enter your email'),
});

const EmailForm = ({ onSubmit, loading, success }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
          <Avatar className={classes.avatar}>
            <EmailRounded />
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h2">
            Activate email
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Please enter your email to continue
          </Typography>
          <TextField
            {...register('email')}
            // helperText={errors.email && errors.email.message}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Typography className={classes.error} color="error" variant="body2">
            {errors.email?.message}
          </Typography>
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit}`}
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
  onSubmit: PropTypes.func.isRequired,
};

export default EmailForm;
