import Alert from '@material-ui/lab/Alert';
import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import { LOAD_USER_LOADING } from 'components/login/actions';
import { useLogin } from 'hook/useLogin';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Loading } from 'react-admin';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getProfile } from 'services/api/httpClient';

const initialState = {
  data: {},
};

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { errorAuth, login } = useLogin();
  // const { data, error, fetchUser } = { ...props };
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialState);
  const token = getCookie(StorageKeys.TOKEN);
  const auth = queryString.parse(location.search).code;
  useEffect(() => {
    const SignIn = async () => {
      login(auth, function () {
        if (token) {
          getProfile
            .requestApi()
            .then((response) => {
              const data = response.data;
              localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(data));
              setData(data);
            })
            .catch((err) => {
              console.log(err.message);
              setError(err.message);
            });
        }
      });
    };
    SignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
