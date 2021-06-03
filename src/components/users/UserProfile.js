import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import avatar from '../../assets/images/avatars/avatar_3.png';

const useStyles = makeStyles({
  cls0: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  sizeAvatar: {
    height: 100,
    width: 100,
  },
});

const UserProfile = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.cls0}>
      <Avatar className={classes.sizeAvatar} src={avatar} />
      <Typography color="textPrimary" gutterBottom variant="h3"></Typography>
      <Typography color="textSecondary" variant="body1"></Typography>
    </Box>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
