import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import client from '../../utils/client';

function UserProfileSideBar({ profileLink, changePasswordLink }) {
  let token = client.token;
  const navigate = useNavigate();

  if (token === undefined) {
    navigate('/');
  }

  return token ? (
    <div className="col-md-3 col-12 profile-side-bar side-bar-mobile">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? ' selected' : '')}
            to={{ pathname: `${profileLink}` }}
          >
            Profile{' '}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? ' selected' : '')}
            to={{ pathname: `${changePasswordLink}` }}
          >
            Change password
          </NavLink>
        </li>
      </ul>
    </div>
  ) : (
    <div>{window.location.reload()}</div>
  );
}

export default UserProfileSideBar;
