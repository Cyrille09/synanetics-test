import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import {
  FiExternalLink,
  FiChevronDown,
  FiLogIn,
  FiUser,
  FiBox,
} from 'react-icons/fi';
import { BsBasket2 } from 'react-icons/bs';

import { logout, viewUserProfile } from '../../services/usersServives';
import { viewBasketsByUser } from '../../services/basketsServices';
import client from '../../utils/client';
import './navbar.css';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState({});
  const [itemTotal, setItemTotal] = useState('');
  const baseURL = process.env.REACT_APP_BASE_URL_FILE;
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  let token = client.token;

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);

      // Socket for getting users record
      socket.on('user', (ms) => {
        tokenFunction();
        getItemTotal();
      });
      // Socket for getting products record
      socket.on('product', (ms) => {
        tokenFunction();
        getItemTotal();
      });
      // Socket for getting products record
      socket.on('basket', (ms) => {
        tokenFunction();
        getItemTotal();
      });
    }
    clientSocket();
    tokenFunction();
    getItemTotal();
  }, []);

  async function getItemTotal() {
    viewBasketsByUser()
      .then((response) => {
        setItemTotal(response.data.totalQuantity);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async function tokenFunction() {
    token &&
      viewUserProfile()
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  }

  async function viewBasket() {
    navigate('/basket');
  }

  async function logoutUser() {
    if (window.confirm('Are you sure you want to log out?')) {
      logout()
        .then((response) => {
          Cookies.remove('synaneticsUserToken');
          Cookies.remove('createSynaneticsDetail');
          navigate('/');
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.data.userError) {
            console.log(error.response.data);
          }
          Cookies.remove('synaneticsUserToken');
          Cookies.remove('createSynaneticsDetail');
          navigate('/');
          window.location.reload();
        });
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <span>Synanetics</span>
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink
                to="/"
                //activeClassName="navbar-active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            {token === undefined ? (
              <li className="nav-item">
                <NavLink
                  to="/sign-in"
                  //activeClassName="navbar-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i className="login-icon">
                    {' '}
                    <FiLogIn />
                  </i>{' '}
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-links"
                  //onClick={closeMobileMenu}
                >
                  {user && user.userImage ? (
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
                  <span className="headerTitleNameWeb">{user.firstName}</span>
                  <i className="login-icon">
                    {' '}
                    <FiChevronDown />
                  </i>
                </Link>
                <ul>
                  {/* <li>
                    <NavLink
                      to="/profile"
                      //activeClassName="navbar-active"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      <i className="login-icon">
                        {' '}
                        <FiUser />
                      </i>
                      Profile
                    </NavLink>
                  </li> */}

                  {user.role === 'admin' && (
                    <li className="small-sizes">
                      <NavLink
                        to="/cms/dashboard"
                        // activeClassName="navbar-active"
                        className="nav-links"
                        onClick={closeMobileMenu}
                      >
                        <i className="login-icon">
                          {' '}
                          <FiBox />
                        </i>
                        Dashboard
                      </NavLink>
                    </li>
                  )}

                  <li>
                    <Link
                      to="#"
                      className="nav-links"
                      onClick={() => logoutUser()}
                    >
                      <i className="login-icon">
                        {' '}
                        <FiExternalLink />
                      </i>{' '}
                      logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <button
                type="button"
                className="icon-button-home"
                onClick={() => viewBasket()}
              >
                <i className="login-icon">
                  {' '}
                  <BsBasket2 />
                </i>
                {itemTotal || ''}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
