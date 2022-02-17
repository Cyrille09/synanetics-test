import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { addProduct } from '../../../services/productsServices';
import { Page } from '../../page';
import { Button } from '../../../components/button';
import ProductForm from '../../../components/product-form';

function AddProduct() {
  const [productImage, setProductImage] = useState('');
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL_FILE;

  function validator(values) {
    let numberReg = /^[0-9]+$/;
    const errors = {};

    if (!values.name) {
      errors.name = 'Product name is required';
    }

    if (!values.price) {
      errors.price = 'Price is required';
    } else if (!numberReg.test(values.price)) {
      errors.price = 'Number only';
    }

    if (values.discount && !numberReg.test(values.discount)) {
      errors.discount = 'Number only';
    }

    return errors;
  }

  const handleChange = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
  };

  const initialValues = {
    productImage: '',
    name: '',
    price: '',
    discount: '',
  };

  async function addRecord(values) {
    const data = new FormData();
    data.append('name', values.name);
    data.append('price', values.price);
    data.append('discount', values.discount);
    data.append('productImage', productImage);
    data.append('user', Cookies.get('createSynaneticsDetail'));

    addProduct(data)
      .then((response) => {
        const socket = io(baseURL);
        const userId = Cookies.get('createSynaneticsDetail');
        socket.emit('product', `${userId}`);
        navigate(`/cms/products`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <Page
      title="Add Product"
      navigate={
        <Button
          onClick={() => {
            navigate('/cms/products');
          }}
          format="primary"
          small
        >
          View Products
        </Button>
      }
    >
      <ProductForm
        initialValues={initialValues}
        validator={validator}
        submitRecord={addRecord}
        handleChange={handleChange}
        productImage={productImage}
      />
    </Page>
  );
}

export default AddProduct;
