import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { Page } from '../../page';
import { Button } from '../../../components/button';
import { viewUsers, deleteUser } from '../../../services/usersServives';
import { Pagination } from '../../../components/pagination';

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL_FILE;

  // pagination
  const [page, setPage] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * page.perPage;
  const [pageCount, setPageCount] = useState(0);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);

      // Socket for getting users record
      socket.on('user', (ms) => {
        getData();
      });
    }
    clientSocket();
    getData();
  }, []);

  function getData() {
    viewUsers()
      .then((response) => {
        setUsers(response.data.users);
        setPage(response.data);
        setPageCount(Math.ceil(response.data.total / response.data.perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteData(id) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
        .then((response) => {
          const socket = io(baseURL);
          const userId = Cookies.get('createSynaneticsDetail');
          socket.emit('user', `${userId}`);
          socket.emit('deleteUser', `${id}`);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }
  return (
    <Page
      title="Users List"
      navigate={
        <Button
          onClick={() => {
            navigate('/cms/users/add');
          }}
          format="primary"
          small
        >
          Add User
        </Button>
      }
    >
      <div>
        <table id="example2" className="table table-bordered table-hover">
          <thead className="headerTable">
            <tr>
              <th>Image</th>
              <th>Fulll Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th className="col-span" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(pageVisited, pageVisited + page.perPage)
              .map((user) => (
                <tr key={user._id}>
                  <td>Image</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td className="col-span">
                    <Button
                      to={`/cms/users/edit/${user._id}`}
                      small
                      format="primary"
                    >
                      Edit
                    </Button>
                  </td>
                  <td className="col-span">
                    <Button
                      to="#"
                      onClick={() => deleteData(user._id)}
                      small
                      format="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination pageCount={pageCount} changePage={changePage} />
    </Page>
  );
}
