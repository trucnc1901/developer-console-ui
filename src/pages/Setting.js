import { Box, Container } from '@material-ui/core';
import { useCheckAuth } from 'react-admin';
import { useEffect } from 'react';
import SettingsNotifications from 'components/settings/SettingsNotifications';
import SettingsPassword from 'components/settings/SettingsPassword';

const Setting = () => {
  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth().catch(() => {});
  }, []);
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
