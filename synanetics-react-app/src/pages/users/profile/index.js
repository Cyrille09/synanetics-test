import React from 'react';
import { Page } from '../../../components/page';
import UserProfileSideBar from '../../../components/user-form/SideBarProfile';
import ViewProfileDetails from '../../../components/user-form/ViewDetails';

export default function UserProfile() {
  return (
    <Page title="User Profile">
      <div className="main_container about-us about-top">
        <div className="container">
          <ViewProfileDetails
            epr="/user/profile"
            edpr="/edit-user/profile/edit"
            epic="/picture-user/profile/editPicture"
          >
            <UserProfileSideBar
              profileLink="/user/profile"
              changePasswordLink="/password-user/profile/change-password"
            />
          </ViewProfileDetails>
        </div>
      </div>
    </Page>
  );
}
