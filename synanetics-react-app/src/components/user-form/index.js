import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Input } from '../fields/input';
import { Select } from '../fields/select';
import { Button } from '../button';

function UserForm({ ui, initialValues, validator, submitRecord, emailError }) {
  return (
    <div>
      <Formik
        form
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitRecord}
      >
        <Form>
          <div className="row">
            <>
              {/* add and edit a user fields */}
              {(ui === 'addUser' || ui === 'editUser') && (
                <>
                  <div className="col-md-6 col-12 form-group">
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      id="firstName"
                    />
                  </div>
                  <div className="col-md-6 col-12 form-group">
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      id="lastName"
                    />
                  </div>

                  <div className="col-md-6 col-12 form-group">
                    <Input
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      type="text"
                      name="mobile"
                      id="mobile"
                    />
                  </div>
                  <div className="col-md-6 col-12 form-group">
                    <Select
                      label="Role"
                      name="role"
                      id="role"
                      options={[
                        {
                          label: 'Admin',
                          value: 'admin',
                        },
                        {
                          label: 'Subscriber',
                          value: 'subscriber',
                        },
                      ]}
                    />
                  </div>
                  <div className="col-md-6 col-12 form-group">
                    <Select
                      label="Gender"
                      name="gender"
                      id="gender"
                      options={[
                        {
                          label: 'Male',
                          value: 'male',
                        },
                        {
                          label: 'Female',
                          value: 'female',
                        },
                        {
                          label: 'Other',
                          value: 'other',
                        },
                      ]}
                    />
                  </div>
                </>
              )}

              {/* edit a user field */}
              {ui === 'editUser' && (
                <div className="col-md-6 col-12 form-group">
                  <Select
                    label="Status"
                    name="status"
                    id="status"
                    options={[
                      {
                        label: 'Active',
                        value: 'active',
                      },
                      {
                        label: 'Inactive',
                        value: 'inactive',
                      },
                    ]}
                  />
                </div>
              )}

              {/* add a user fields */}
              {ui === 'addUser' && (
                <>
                  <div className="col-md-6 col-12 form-group">
                    <Input
                      label="Email"
                      placeholder="Email"
                      type="text"
                      name="email"
                      id="email"
                    />

                    {emailError ? (
                      <p className="errorMessage"> {emailError}</p>
                    ) : null}
                  </div>
                  <div className="col-md-6 col-12 form-group">
                    <Input
                      label="Password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                    />
                  </div>
                  <div className="col-md-6 col-12 form-group">
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                    />
                  </div>
                </>
              )}

              {/* Login fields */}
              {ui === 'loginUser' && (
                <>
                  <div className="col-12 form-group">
                    <Input
                      label="Email"
                      placeholder="Email"
                      type="text"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <Input
                      label="Password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                    />
                    {emailError ? (
                      <p className="errorMessage"> {emailError}</p>
                    ) : null}
                  </div>
                </>
              )}
              <div className="col-12 form-group">
                <div className="row">
                  <div className="col-6 form-group">
                    <Button format="success" small type="submit">
                      Submit
                    </Button>
                  </div>
                  <div className="col-6 form-group rightAlign">
                    <Link to="/cms/users">
                      <Button format="primary" small>
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default UserForm;
