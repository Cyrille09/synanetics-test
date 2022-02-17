import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { updateUser, viewEachUser } from '../../../services/usersServives';
import { Page } from '../../page';
import { Button } from '../../../components/button';
import UserForm from '../../../components/user-form';

function EditUser() {
  const [user, setUser] = useState();
  const match = { params: useParams() };
  let id = `${match.params.id}`;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [match.params.id]);

  function validator(values) {
    let mobileParsed = parsePhoneNumberFromString(values.mobile, 'GB');

    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!values.gender) {
      errors.gender = 'Gender is required';
    }

    if (!values.role) {
      errors.role = 'Role is required';
    }

    if (!values.status) {
      errors.status = 'Status is required';
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
    ...user,
  };

  async function getData() {
    viewEachUser(id)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateRecord(values) {
    const updateData = {
      ...values,
    };

    updateUser(updateData, values._id)
      .then((response) => {
        navigate(`/cms/users`);
      })
      .catch((error) => {});
  }

  return (
    <Page
      title="Edit User"
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
      {user && (
        <UserForm
          initialValues={initialValues}
          validator={validator}
          submitRecord={updateRecord}
          ui="editUser"
        />
      )}
    </Page>
  );
}

export default EditUser;
