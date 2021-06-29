import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { userActivate } from 'services/api/httpClient';
import EmailForm from './EmailForm';
import Notify from './Notify';

const Email = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const handleEmail = (email) => {
    setLoading(true);
    const fetchEmail = async () => {
      await userActivate
        .requestApi(email)
        .then(() => {
          setTimeout(() => {
            setSuccess(true);
          }, 1000);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };
    fetchEmail();
  };

  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
  if (success) return <Notify />;

  return <EmailForm handleEmail={handleEmail} loading={loading} />;
};

export default Email;
