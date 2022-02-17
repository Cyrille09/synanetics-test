import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { addUser } from '../../../services/usersServives';
import { Page } from '../../page';
import { Button } from '../../../components/button';
import UserForm from '../../../components/user-form';

function AddUser() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessager] = useState('');

  function validator(values) {
    let emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let mobileParsed = parsePhoneNumberFromString(values.mobile, 'GB');

    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!emailReg.test(values.email)) {
      errors.email = 'Invalid email';
    }
    if (!values.gender) {
      errors.gender = 'Gender is required';
    }

    if (!values.role) {
      errors.role = 'Role is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be minimum 8 characters';
    }
    if (!values.confirm_password) {
      errors.confirm_password = 'Confirm Password is required';
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = 'Password and confirm password must match';
    }

    if (!values.mobile) {
      errors.mobile = 'Phone number is required';
    } else if (values.mobile && (!mobileParsed || !mobileParsed.isValid())) {
      errors.mobile =
        'Please enter a valid phone number including country code (e.g. +44)';
    }

    return errors;
  }

  const initialValues = {
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    gender: '',
    mobile: '',
    password: '',
    confirm_password: '',
  };

  async function addRecord(values) {
    setErrorMessager('');
    const addData = {
      ...values,
    };

    addUser(addData)
      .then((response) => {
        navigate(`/cms/users`);
      })
      .catch((error) => {
        if (error.response.data.emailError) {
          setErrorMessager(error.response.data.emailError);
        }
      });
  }

  return (
    <Page
      title="Add User"
      navigate={
        <Button
          onClick={() => {
            navigate('/cms/users');
          }}
          format="primary"
          small
        >
          View Users
        </Button>
      }
    >
      <UserForm
        initialValues={initialValues}
        validator={validator}
        submitRecord={addRecord}
        ui="addUser"
        emailError={errorMessage}
      />
    </Page>
  );
}

export default AddUser;
