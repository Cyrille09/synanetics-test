import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Input } from '../fields/input';
import { Button } from '../button';

function ProductForm({
  initialValues,
  validator,
  submitRecord,
  handleChange,
  productImage,
}) {
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
              <div className="col-md-6 col-12 form-group">
                <Input
                  label="Name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="col-md-6 col-12 form-group">
                <Input
                  label="Price"
                  placeholder="Price"
                  type="text"
                  name="price"
                  id="price"
                />
              </div>
              <div className="col-md-6 col-12 form-group">
                <div className=" form-group-flex">
                  <label>Select Image</label>
                  <input
                    label="Product Image"
                    type="file"
                    name={productImage}
                    accept=".jpg, .png, .jpeg"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 form-group">
                <Input
                  label="Discount"
                  placeholder="Discount"
                  type="text"
                  name="discount"
                  id="discount"
                />
              </div>

              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <Button format="success" small type="submit">
                      Submit
                    </Button>
                  </div>
                  <div className="col-6 rightAlign">
                    <Link to="/cms/products">
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

export default ProductForm;
