import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../components/page';
import UserProfileSideBar from '../../../components/user-form/SideBarProfile';
import PasswordChangeProfile from '../../../components/user-form/PasswordChange';
import { changeUserPassword } from '../../../services/usersServives';

export default function ChangePassword() {
  const [errorMessage, setErrorMessager] = useState('');
  const navigate = useNavigate();

  function validator(values) {
    const errors = {};

    if (!values.oldPassword) {
      errors.oldPassword = 'Old Password is required';
    }

    if (!values.password) {
      errors.password = 'New Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'New Password must be minimum 8 characters';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'New Password and confirm password must match';
    }

    return errors;
  }

  async function resetPassword(values) {
    setErrorMessager('');
    const resetPassword = {
      ...values,
    };

    changeUserPassword(resetPassword)
      .then((response) => {
        navigate(`/user/profile`);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.oldPasswordError) {
          setErrorMessager(error.response.data.oldPasswordError);
        }
      });
  }
  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };
  return (
    <Page title="Dashboard">
      <div className="main_container about-us about-top">
        <div className="container">
          <PasswordChangeProfile
            initialValues={initialValues}
            validator={validator}
            submitRecord={resetPassword}
            passwordError={errorMessage}
            ui="/user/profile"
          >
            <UserProfileSideBar
              profileLink="/user/profile"
              changePasswordLink="/password-user/profile/change-password"
            />
          </PasswordChangeProfile>
        </div>
      </div>
    </Page>
  );
}
