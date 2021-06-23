import Alert from '@material-ui/lab/Alert';
import { httpClient } from 'common/utils/request/common';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import EmailForm from './EmailForm';
import Notify from './Notify';

const Email = () => {
  const { REACT_APP_MINIAP_API_ACTIVATE_REQUEST } = process.env;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [error, setError] = useState();
  const history = useHistory();
  const handleEmail = (email) => {
    const activateEmail = async () => {
      const url = `${REACT_APP_MINIAP_API_ACTIVATE_REQUEST}?email=${email}`;
      try {
        await httpClient(url).then(({ status }) => {
          if (status === 401) {
            setError('Authorization required');
            setTimeout(() => {
              history.push('/login');
            }, 600);
          }
          setTimeout(() => {
            setSuccess(false);
          }, 600);
        });
        setLoading(true);
      } catch (error) {
        setError(error);
      }
    };
    activateEmail();
  };

  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
  return success ? <EmailForm handleEmail={handleEmail} loading={loading} /> : <Notify />;
};

export default Email;
