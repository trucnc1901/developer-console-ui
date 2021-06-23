import { GetProfile } from 'components/common/request/GetProfile';
import React, { useEffect, useState } from 'react';
import { Layout, Loading } from 'react-admin';
import { useHistory } from 'react-router-dom';
import MyAppBar from './MyAppBar';
import MyMenu from './MyMenu';
import MySidebar from './MySidebar';
import Alert from '@material-ui/lab/Alert';

const MyLayout = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await GetProfile().then((res) => {
          if (res.code && res.code === 401) {
            history.push('/');
          }
          if (res.email === '') {
            history.push('/email');
          }
          setUser(res);
          setLoading(false);
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading loadingPrimary="Loading" />;
  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
  if (!user) return null;
  return <Layout {...props} sidebar={MySidebar} menu={MyMenu} appBar={MyAppBar} />;
};

export default MyLayout;
