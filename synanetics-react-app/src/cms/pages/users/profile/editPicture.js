import React from 'react';
import { Page } from '../../../page';
import UserProfileSideBar from '../../../../components/user-form/SideBarProfile';
import EditUserLogoDetails from '../../../../components/user-form/EditUserLogo';

export default function UserProfileEditPicture() {
  return (
    <Page title="Dashboard">
      <div className="main_container about-us about-top">
        <div className="container">
          <EditUserLogoDetails
            epr="/cms/user/profile"
            edpr="/cms/edit-user/profile/edit"
            epic="/cms/picture-user/profile/editPicture"
          >
            <UserProfileSideBar
              profileLink="/cms/user/profile"
              changePasswordLink="/cms/password-user/profile/change-password"
            />
          </EditUserLogoDetails>
        </div>
      </div>
    </Page>
  );
}
