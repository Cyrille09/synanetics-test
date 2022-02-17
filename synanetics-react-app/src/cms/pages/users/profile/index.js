import React from 'react';
import { Page } from '../../../page';
import UserProfileSideBar from '../../../../components/user-form/SideBarProfile';
import ViewProfileDetails from '../../../../components/user-form/ViewDetails';

export default function UserProfile() {
  return (
    <Page title="User Profile">
      <div className="main_container about-us about-top">
        <div className="container">
          <ViewProfileDetails
            epr="/cms/user/profile"
            edpr="/cms/edit-user/profile/edit"
            epic="/cms/picture-user/profile/editPicture"
          >
            <UserProfileSideBar
              profileLink="/cms/user/profile"
              changePasswordLink="/cms/password-user/profile/change-password"
            />
          </ViewProfileDetails>
        </div>
      </div>
    </Page>
  );
}
