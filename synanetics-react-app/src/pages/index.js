import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { viewProducts } from '../services/productsServices';
import { addBasket } from '../services/basketsServices';
import { Page } from '../components/page';

function Home() {
  const [products, setProducts] = useState([]);
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
  }, []);

  function getData() {
    viewProducts().then((response) => {
      setProducts(response.data.products);
    });
  }

  function addToCart(id) {
    const addData = {
      product: id,
      user: Cookies.get('createSynaneticsDetail'),
    };
    addBasket(addData)
      .then((response) => {
        const socket = io(baseURL);
        const userId = Cookies.get('createSynaneticsDetail');
        socket.emit('basket', `${userId}`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function showImage(prodcut) {
    if (prodcut) {
      return (
        <img
          className="product-image"
          src={`${baseURL}/images/products/${prodcut}`}
          width="250"
          height="250"
          alt="No Image"
        />
      );
    } else {
      return (
        <img
          className="product-image"
          width="250"
          height="250"
          src="/images/placeholders/placeholder.png"
          alt="No Image"
        />
      );
    }
  }

  return (
    <Page>
      <div className="home-pages">
        <div className="products">
          {products.map((details) => (
            <div key={details._id} className="home-card">
              <div className="home-page-image">
                {showImage(details.productImage)}
              </div>
              <div>
                <p className="product-name">{details.name}</p>
              </div>
              <div className="product-price row">
                <span className="col-4">
                  <b>Price:</b> £{details.price}
                </span>
                {details.discount > 0 && (
                  <>
                    <span className="col-4">
                      <b>Discount:</b> {details.discount}%
                    </span>
                    <span className="col-4">
                      {' '}
                      <b>Now:</b> £{details.currentPrice}
                    </span>
                  </>
                )}
              </div>
              <div>
                <button
                  onClick={() => addToCart(details._id)}
                  className="product-add-button"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default Home;
