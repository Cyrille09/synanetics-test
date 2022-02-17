import React, { useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import FrontEndNavbar from '../navbar/Navbar';
import FrontEndFooter from '../footer/Footer';
import ScrollToTop from '../scrollToTop/ScrollToTop.';
import { logout } from '../../services/usersServives';
import client from '../../utils/client';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';

function FrontendLayout(props) {
  let token = client.token;

  const idleTimerRef = useRef(null);
  const onIdle = () => {
    logout()
      .then((response) => {
        Cookies.remove('synaneticsUserToken');
        Cookies.remove('createSynaneticsDetail');
        props.history.push('/');
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.userError) {
          Cookies.remove('synaneticsUserToken');
          Cookies.remove('createSynaneticsDetail');
          window.location.reload();
        }
      });
  };

  return (
    <>
      {token && (
        <IdleTimer
          ref={idleTimerRef}
          timeout={1000 * 60 * 60 * 24}
          onIdle={onIdle}
        ></IdleTimer>
      )}
      <ScrollToTop />
      <FrontEndNavbar />
      <Outlet />
      <FrontEndFooter />
    </>
  );
}

export default FrontendLayout;
