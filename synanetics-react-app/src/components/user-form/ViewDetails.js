import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { viewUserProfile } from '../../services/usersServives';
import UserProfileLink from './UserProfileLink';

function ViewProfileDetails({ epr, edpr, epic, children }) {
  const [user, setUsers] = useState({});
  const baseURL = process.env.REACT_APP_BASE_URL_FILE;
  const navigate = useNavigate();

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);
      const userId = Cookies.get('createSynaneticsDetail');

      // Socket for delete user record
      socket.on('deleteUser', (ms) => {
        if (userId === ms) {
          navigate('/');
        }
      });

      // Socket for update user record
      socket.on('updateUser', (ms) => {
        if (userId === ms) {
          getData();
        }
      });
    }
    clientSocket();
    getData();
  }, []);

  async function getData() {
    viewUserProfile()
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <div className="row">
      {children}
      <div className="col-md-9 col-12">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <UserProfileLink epr={epr} edpr={edpr} epic={epic} />
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-12 each-top">
                  <div className="row">
                    <div className="col-12 each-detail">
                      <h5>User details</h5>
                    </div>
                    <div className="col-md-6 col-12 each-p">
                      <p>
                        <span>Full name</span>:{' '}
                        {user.firstName + ' ' + user.lastName}
                      </p>
                    </div>
                    <div className="col-md-6 col-12 each-p">
                      <p>
                        <span>Email</span>: {user.email}
                      </p>
                    </div>
                    <div className="col-md-6 col-12 each-p">
                      <p>
                        <span>Gender</span>: {user.gender}
                      </p>
                    </div>
                    <div className="col-md-6 col-12 each-p">
                      <p>
                        <span>MobileNumber</span>: {user.mobile}
                      </p>
                    </div>
                    <div className="col-md-6 col-12 each-p">
                      <p>
                        <span>Status</span>: {user.status}
                      </p>
                    </div>
                    <div className="col-md-6 col-12 each-p">
                      <p>
                        <span>Role</span>: {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfileDetails;
