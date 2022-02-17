import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { Page } from '../../page';
import { Button } from '../../../components/button';
import {
  viewProducts,
  deleteProduct,
} from '../../../services/productsServices';
import { Pagination } from '../../../components/pagination';

export default function Products() {
  const [products, setProducts] = useState([]);
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

      // Socket for getting products record
      socket.on('product', (ms) => {
        getData();
      });
    }
    clientSocket();
    getData();
  }, []);

  function getData() {
    viewProducts()
      .then((response) => {
        setProducts(response.data.products);
        setPage(response.data);
        setPageCount(Math.ceil(response.data.total / response.data.perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteData(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
        .then((response) => {
          const socket = io(baseURL);
          const userId = Cookies.get('createSynaneticsDetail');
          socket.emit('product', `${userId}`);
          socket.emit('deleteProduct', `${id}`);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }

  function showImage(prodcut) {
    if (prodcut) {
      return (
        <img
          src={`${baseURL}/images/products/${prodcut}`}
          height="40"
          width="40"
          alt="No Image"
        />
      );
    } else {
      return (
        <img
          height="40"
          width="40"
          src="/images/placeholders/placeholder.png"
          alt="No Image"
        />
      );
    }
  }
  return (
    <Page
      title="Products List"
      navigate={
        <Button
          onClick={() => {
            navigate('/cms/products/add');
          }}
          format="primary"
          small
        >
          Add Product
        </Button>
      }
    >
      <div>
        <table id="example2" className="table table-bordered table-hover">
          <thead className="headerTable">
            <tr>
              <th>Image</th>
              <th>Added By</th>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Discount</th>
              <th>Current Price</th>
              <th className="col-span" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .slice(pageVisited, pageVisited + page.perPage)
              .map((product) => (
                <tr key={product._id}>
                  <td>{showImage(product.productImage)}</td>
                  <td>{`${product.user && product.user.firstName} ${
                    product.user && product.user.lastName
                  }`}</td>
                  <td>{`${product.name}`}</td>
                  <td>{`£${product.price}`}</td>
                  <td>{product.discount ? product.discount + '%' : null}</td>
                  <td>{`£${product.currentPrice}`}</td>
                  <td className="col-span">
                    <Button
                      to={`/cms/products/edit/${product._id}`}
                      small
                      format="primary"
                    >
                      Edit
                    </Button>
                  </td>
                  <td className="col-span">
                    <Button
                      to="#"
                      onClick={() => deleteData(product._id)}
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
