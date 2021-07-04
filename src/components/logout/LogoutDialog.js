import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';
import { MenuItemLink } from 'react-admin';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}));

const LogoutView = forwardRef((props, ref) => {
  const classes = useStyles();
  const { handleLogout } = { ...props };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItemLink
        className={classes.root}
        ref={ref}
        to="/"
        primaryText="Logout"
        leftIcon={<ExitIcon />}
        onClick={handleClickOpen} // close the menu on click
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to log out?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

LogoutView.propTypes = {
  handleLogout: PropTypes.func,
};

export default LogoutView;
