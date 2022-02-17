import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from '../fields/input';
import { Select } from '../fields/select';
import { Button } from '../button';
import UserProfileLink from './UserProfileLink';

function EditProfile({
  epr,
  edpr,
  epic,
  children,
  submitRecord,
  validator,
  initialValues,
  emailError,
}) {
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
                    <div className="row form-row">
                      <div className="detail-title col-12">
                        <h5>Pesonal detail</h5>
                      </div>
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
                          label="Mobile Number"
                          placeholder="Mobile Number"
                          type="text"
                          name="mobile"
                          id="mobile"
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
                      <div className="col-12">
                        <div className="row">
                          <div className="col-6">
                            <Button format="success" small type="submit">
                              Submit
                            </Button>
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

export default EditProfile;
