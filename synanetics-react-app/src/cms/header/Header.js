import React, { useEffect, useState } from 'react';
import client from '../../utils/client';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import io from 'socket.io-client';
import { logout, viewUserProfile } from '../../services/usersServives';
const baseURL = process.env.REACT_APP_BASE_URL_FILE;

function Header() {
  const [user, setUsers] = useState({});
  const navigate = useNavigate();

  let token = client.token;

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);
      // Socket for getting users record
      socket.on('user', (ms) => {
        tokenFunction();
      });
    }
    clientSocket();
    tokenFunction();
  }, []);

  async function tokenFunction() {
    if (token === undefined) {
      navigate('/');
    } else {
      viewUserProfile()
        .then((response) => {
          setUsers(response.data.user);
          if (!response.data.token || response.data.user.role !== 'admin') {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }

  async function logoutUser() {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
        .then((response) => {
          Cookies.remove('synaneticsUserToken');
          Cookies.remove('createSynaneticsDetail');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }

  return (
    <>
      <div className="small-sizes">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="fake_url"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <span className="btn">
                {user.userImage ? (
                  <img
                    className="imageRound"
                    src={`${baseURL}/images/users/${user.userImage}`}
                    height="150"
                    width="150"
                  />
                ) : (
                  <img
                    className="imageRound"
                    src="/images/placeholders/placeholder.png"
                    alt="no image"
                  />
                )}

                <span className="headerTitleName">{`${user.firstName} ${user.lastName}`}</span>
              </span>
            </li>
            <li className="nav-item dropdown logoutDropdown">
              <button className="btn" onClick={() => logoutUser()}>
                <i className="login-icon">
                  {' '}
                  <FiExternalLink />
                </i>{' '}
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
