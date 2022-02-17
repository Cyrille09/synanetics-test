import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from '../fields/input';
import { Button } from '../button';

function PasswordChange({
  initialValues,
  validator,
  submitRecord,
  passwordError,
  children,
}) {
  return (
    <div className="row">
      {children}
      <div className="col-md-9 col-12">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Formik
                form
                initialValues={initialValues}
                validate={validator}
                onSubmit={submitRecord}
              >
                <Form>
                  <div className="col-md-8 col-12 form-row user-detail-record">
                    <div className="col-12 form-group">
                      <Input
                        label="Old Password"
                        placeholder="Old Password"
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                      />
                      {passwordError ? (
                        <p className="errorMessage"> {passwordError}</p>
                      ) : null}
                    </div>

                    <div className="col-12 form-group">
                      <Input
                        label="New password"
                        placeholder="New password"
                        type="password"
                        name="password"
                        id="password"
                      />
                    </div>
                    <div className="col-12 form-group">
                      <Input
                        label="Confirm password"
                        placeholder="Confirm password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                      />
                    </div>
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
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
