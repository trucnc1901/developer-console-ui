import { Box, Container, Grid, Typography } from '@material-ui/core';
import theme from 'common/theme';
import { Title } from 'react-admin';

const Profile = (props) => {
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
            Profile
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
