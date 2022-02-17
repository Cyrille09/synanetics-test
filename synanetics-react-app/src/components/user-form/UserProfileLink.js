import React from 'react';
import { NavLink } from 'react-router-dom';

function UserProfileLink({ epr, edpr, epic }) {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          'btn-style btn-info mr-2' + (isActive ? ' selectedProfile' : '')
        }
        to={{ pathname: epr }}
      >
        View
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'btn-style btn-info mr-2' + (isActive ? ' selectedProfile' : '')
        }
        to={{ pathname: edpr }}
      >
        Edit
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'btn-style btn-info mr-2' + (isActive ? ' selectedProfile' : '')
        }
        to={{ pathname: epic }}
      >
        Picture
      </NavLink>
    </>
  );
}

export default UserProfileLink;
