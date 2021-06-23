import { Box, Container, Grid, Typography, Avatar, makeStyles } from '@material-ui/core';
import theme from 'common/theme';
import { useEffect, useState } from 'react';
import { Title, useGetIdentity } from 'react-admin';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
  },
  cls0: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  sizeAvatar: {
    height: 100,
    width: 100,
    marginBottom: '16px',
  },
});

const Profile = (props) => {
  const classes = useStyles();
  const { identity } = useGetIdentity();
  const { avatar, name, email } = { ...identity };
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      setUser({ avatar, name, email });
    };
    fetchProfile();
  }, [avatar, name, email]);
  return (
    <Box
      py={3}
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
      }}
    >
      <Container maxWidth={false}>
        <Title title="Profile" />
        <Grid container spacing={3} className={classes.root}>
          <Box className={classes.cls0}>
            <Avatar src={user.avatar} className={classes.sizeAvatar} />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {user.email}
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
