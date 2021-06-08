import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Title } from 'react-admin';
import StorageKeys from '../common/constant/storage-keys';
import theme from '../common/theme';
import { useHistory } from 'react-router-dom';

const Dashboard = (props) => {
  let history = useHistory();
  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem(StorageKeys.PROFILE) || '{}');
    console.log(profile.email);
    if (!profile.email) history.push('/email');
  }, []);
  return (
    <Box
      py={3}
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
      }}
    >
      <Container maxWidth={false}>
        <Title title="Dashboard" />
        <Grid container spacing={3}>
          <Typography color="textPrimary" gutterBottom variant="h3">
            Dashboard
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
