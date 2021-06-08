import { Box, Container } from '@material-ui/core';
import CheckAuth from '../components/common/CheckAuth';
import SettingsNotifications from '../components/settings/SettingsNotifications';
import SettingsPassword from '../components/settings/SettingsPassword';

const Setting = () => {
  CheckAuth();
  return (
    <Box
      css={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <SettingsNotifications />
        <Box css={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  );
};

export default Setting;
