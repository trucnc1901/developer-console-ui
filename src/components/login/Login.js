import Alert from '@material-ui/lab/Alert';
import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import { LOAD_USER_LOADING } from 'components/login/actions';
import { useLogin } from 'hook/useLogin';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Loading } from 'react-admin';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { errorAuth, login } = useLogin();
  const { data, error, fetchUser } = { ...props };
  const token = getCookie(StorageKeys.TOKEN);
  const auth = queryString.parse(location.search).code;

  useEffect(() => {
    let isMounted = true;
    const SignIn = () => {
      login(auth, function () {
        if (token) {
          if (isMounted) fetchUser();
        }
      });
    };
    SignIn();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, fetchUser]);

  if (data.id) {
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  if (errorAuth)
    return (
      <Alert variant="filled" severity="error">
        {errorAuth && errorAuth}
      </Alert>
    );
  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error && error}
      </Alert>
    );
  return <Loading loadingPrimary="Loading" />;
};

const mapStateToProps = (state) => {
  return {
    data: state.user.data,
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch({ type: LOAD_USER_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
