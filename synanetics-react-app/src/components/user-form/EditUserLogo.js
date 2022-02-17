import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import UserProfileLink from './UserProfileLink';
import { Button } from '../button';
import {
  viewImage,
  updateUserProfileImage,
  deleteImage,
} from '../../services/usersServives';
const baseURL = process.env.REACT_APP_BASE_URL_FILE;

function EditUserLogo({
  children,
  epr,
  edpr,
  epic,
  submitRecord,
  validator,
  initialValues,
}) {
  const [userLogoDisplay, setUserLogoDisplay] = useState('');

  const hiddenFileInputRef = useRef(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);
      const userId = Cookies.get('createSynaneticsDetail');

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

  const fileSelectedHandler = (event) => {
    if (event.target.files[0]) {
      const selectedImage = URL.createObjectURL(event.target.files[0]);
      const newUserImage = event.target.files[0];
      setUserImage(newUserImage);
      setImageSelected(selectedImage);
    }
  };

  const fileRemoveHandler = () => {
    setImageSelected();
  };

  const fileUploadHandler = () => {
    hiddenFileInputRef.current.click();
  };

  async function handleSubmitImage() {
    if (!userImage || userImage === undefined || !imageSelected) {
      window.confirm('chooseImageBeforeUploading');
    } else {
      updateUserImage();
    }
  }

  function showImage() {
    if (userLogoDisplay && !imageSelected) {
      return (
        <img
          src={`${baseURL}/images/users/${userLogoDisplay}`}
          height="150"
          width="150"
          alt="No Image"
        />
      );
    } else if (imageSelected) {
      return (
        <img width="150" height="150" src={imageSelected} alt="No Image" />
      );
    } else {
      return (
        <img
          width="150"
          height="150"
          src="/images/placeholders/placeholder.png"
          alt="No Image"
        />
      );
    }
  }

  async function updateUserImage() {
    const data = new FormData();
    data.append('userImage', userImage);

    updateUserProfileImage(data)
      .then((response) => {
        setImageSelected('');
        const socket = io(baseURL);
        const userId = Cookies.get('createSynaneticsDetail');
        socket.emit('user', `${userId}`);
        socket.emit('updateUser', `${userId}`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async function getData() {
    viewImage()
      .then((response) => {
        setUserLogoDisplay(response.data.userImage);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async function deleteLogo() {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteImage()
        .then((response) => {
          const socket = io(baseURL);
          const userId = Cookies.get('createSynaneticsDetail');
          socket.emit('user', `${userId}`);
          socket.emit('updateUser', `${userId}`);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
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
              <Formik
                form
                initialValues={initialValues}
                validate={validator}
                onSubmit={submitRecord}
              >
                <Form>
                  <div className="col-12 user-detail-record">
                    <div className="row">
                      <div className="col-12">
                        <h5>Profile image</h5>
                      </div>
                      <div className="col-12 showImage">{showImage()}</div>
                      <div className="col-md-6 col-12 form-group">
                        <div className="col-12 form-group">
                          <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={hiddenFileInputRef}
                            accept=".jpg, .png, .jpeg"
                            onChange={fileSelectedHandler}
                          />
                        </div>
                        <div className="col-12 form-group">
                          <div className="row">
                            {!imageSelected && (
                              <div className="col-6 form-group">
                                <Button
                                  onClick={fileUploadHandler}
                                  format="primary"
                                  small
                                >
                                  Select Image
                                </Button>
                              </div>
                            )}
                            {userLogoDisplay && !imageSelected && (
                              <div className="col-6 form-group">
                                <Button
                                  onClick={deleteLogo}
                                  format="danger"
                                  small
                                >
                                  Remove Profile Picture
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 form-group">
                          <div className="row">
                            {imageSelected && (
                              <>
                                <div className="col-6 form-group">
                                  <Button
                                    onClick={() => handleSubmitImage()}
                                    format="success"
                                    small
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                                <div className="col-6 form-group">
                                  <Button
                                    onClick={fileRemoveHandler}
                                    format="danger"
                                    small
                                  >
                                    Remove Image
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserLogo;
