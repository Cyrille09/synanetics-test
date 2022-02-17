import React, { useState, useEffect, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ScrollToTop from '../scrollToTop/ScrollToTop.';
import DashboardHeader from '../../cms/header/Header';
import DashboardSideBar from '../../cms/sidebar/SideBar';
import client from '../../utils/client';
import { viewUserProfile, logout } from '../../services/usersServives';

function DashboardLayout(props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (client.token === undefined) {
      navigate('/');
    }
    getData();
  }, []);

  const idleTimerRef = useRef(null);

  const onIdle = () => {
    logout()
      .then((response) => {
        Cookies.remove('synaneticsUserToken');
        Cookies.remove('createSynaneticsDetail');
        navigate('/');
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

  async function getData() {
    viewUserProfile()
      .then((response) => {
        setUser(response.data.user);
        if (response.data.user.role !== 'admin') {
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.data.userError) {
          Cookies.remove('synaneticsUserToken');
          Cookies.remove('createSynaneticsDetail');
          navigate('/');
          window.location.reload();
        }
      });
  }

  return (
    user.role === 'admin' && (
      <>
        {client.token && (
          <IdleTimer
            ref={idleTimerRef}
            timeout={1000 * 60 * 60 * 24}
            onIdle={onIdle}
          ></IdleTimer>
        )}
        <ScrollToTop />
        <DashboardHeader />
        <DashboardSideBar />
        <Outlet />
      </>
    )
  );
}

export default DashboardLayout;
