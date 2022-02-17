import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import {
  viewEachProduct,
  updateProduct,
} from '../../../services/productsServices';
import { Page } from '../../page';
import { Button } from '../../../components/button';
import ProductForm from '../../../components/product-form';

function EditProduct() {
  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState('');
  const match = { params: useParams() };
  let id = `${match.params.id}`;
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL_FILE;

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);

      // Socket for getting products record
      socket.on('product', (ms) => {
        getData();
      });
    }
    clientSocket();
    getData();
  }, [match.params.id]);

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

  const initialValues = {
    ...product,
  };

  async function getData() {
    viewEachProduct(id)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const handleChange = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
  };

  async function updateRecord(values) {
    // const updateData = {
    //   ...values,
    // };

    const data = new FormData();
    data.append('name', values.name);
    data.append('price', values.price);
    data.append('discount', values.discount);
    data.append('productImage', productImage);

    updateProduct(data, values._id)
      .then((response) => {
        const socket = io(baseURL);
        const userId = Cookies.get('createSynaneticsDetail');
        socket.emit('product', `${userId}`);
        socket.emit('updateProduct', `${values._id}`);
        navigate(`/cms/products`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <Page
      title="Edit Product"
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
      {product.name && (
        <ProductForm
          initialValues={initialValues}
          validator={validator}
          submitRecord={updateRecord}
          handleChange={handleChange}
          productImage={productImage}
        />
      )}
    </Page>
  );
}

export default EditProduct;
