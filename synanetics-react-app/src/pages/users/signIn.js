import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Button } from '../../components/button';
import Cookies from 'js-cookie';
import UserForm from '../../components/user-form';
import { login } from '../../services/usersServives';
import client from '../../utils/client';
import { Page } from '../../components/page';

function SignIn() {
  const [errorMessage, setErrorMessager] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (client.token !== undefined) {
      navigate('/');
    }
  }, []);

  function validator(values) {
    let emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!emailReg.test(values.email)) {
      errors.email = 'Invalid email';
    }
    if (!values.password) {
      errors.password = 'Password required';
    }

    return errors;
  }

  const initialValues = {
    email: '',
    password: '',
  };

  async function loginData(values) {
    setErrorMessager('');
    login(values.email, values.password)
      .then((response) => {
        console.log(response.data);
        Cookies.set('synaneticsUserToken', response.data.token, {});
        Cookies.set('createSynaneticsDetail', response.data.user._id, {});
        window.location.reload();
        navigate(`/cms/dashboard`);
      })
      .catch((error) => {
        setErrorMessager(error.response.data.error);
      });
  }

  return (
    <>
      <Page>
        <div className="login-page">
          <UserForm
            initialValues={initialValues}
            validator={validator}
            submitRecord={loginData}
            emailError={errorMessage}
            ui="loginUser"
          />
        </div>
      </Page>
    </>
  );
}

export default SignIn;
