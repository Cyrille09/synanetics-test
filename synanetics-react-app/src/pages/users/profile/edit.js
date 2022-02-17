import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Page } from '../../../components/page';
import UserProfileSideBar from '../../../components/user-form/SideBarProfile';
import EditProfileDetails from '../../../components/user-form/EditProfile';
import {
  viewUserProfile,
  updateUserProfile,
} from '../../../services/usersServives';

export default function EditProfile() {
  const [errorMessage, setErrorMessager] = useState('');
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

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
    viewUserProfile()
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateRecord(values) {
    setErrorMessager('');
    const updateData = {
      ...values,
    };

    updateUserProfile(updateData)
      .then((response) => {
        navigate(`/user/profile`);
      })
      .catch((error) => {
        if (error.response.data.errorEmail) {
          setErrorMessager(error.response.data.errorEmail);
        }
      });
  }

  return (
    <Page title="Edit User Profile">
      <div className="main_container about-us about-top">
        <div className="container">
          {user && (
            <EditProfileDetails
              epr="/user/profile"
              edpr="/edit-user/profile/edit"
              epic="/picture-user/profile/editPicture"
              initialValues={initialValues}
              validator={validator}
              submitRecord={updateRecord}
              emailError={errorMessage}
            >
              <UserProfileSideBar
                profileLink="/user/profile"
                changePasswordLink="/password-user/profile/change-password"
              />
            </EditProfileDetails>
          )}
        </div>
      </div>
    </Page>
  );
}
