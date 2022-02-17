import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import {
  updateBasketWithIncrease,
  updateBasketWithDecrease,
  viewBasketsByUser,
  deleteBasketWithLastItem,
} from '../services/basketsServices';
import { Page } from '../components/page';

function Home() {
  const [basketItems, setBasketItems] = useState([]);
  const [basketTotal, setBasketTotal] = useState('');
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL_FILE;

  useEffect(() => {
    async function clientSocket() {
      const socket = io(baseURL);

      // Socket for getting products record
      socket.on('product', (ms) => {
        getData();
      });
      // Socket for getting products record
      socket.on('basket', (ms) => {
        getData();
      });
    }
    clientSocket();
    getData();
  }, []);

  function getData() {
    viewBasketsByUser()
      .then((response) => {
        setBasketItems(response.data.baskets);
        setBasketTotal(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function addToCart(id) {
    const addData = {
      product: id,
      user: Cookies.get('createSynaneticsDetail'),
    };
    updateBasketWithIncrease(addData)
      .then((response) => {
        const socket = io(baseURL);
        const userId = Cookies.get('createSynaneticsDetail');
        socket.emit('basket', `${userId}`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function removeFromCart(id) {
    const addData = {
      product: id,
      user: Cookies.get('createSynaneticsDetail'),
    };
    updateBasketWithDecrease(addData)
      .then((response) => {
        const socket = io(baseURL);
        const userId = Cookies.get('createSynaneticsDetail');
        socket.emit('basket', `${userId}`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function deleteCart(id) {
    const addData = {
      product: id,
      user: Cookies.get('createSynaneticsDetail'),
    };
    deleteBasketWithLastItem(addData)
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
          className="cart-items-image"
          src={`${baseURL}/images/products/${prodcut}`}
          alt="No Image"
        />
      );
    } else {
      return (
        <img
          className="cart-items-image"
          src="/images/placeholders/placeholder.png"
          alt="No Image"
        />
      );
    }
  }

  return (
    <Page>
      <div className="cart-items">
        <div className="cart-items-header">Cart Items</div>
        {basketItems.length <= 0 && (
          <p className="cart-items-empty">Item not found</p>
        )}
        {basketItems.length > 0 &&
          basketItems.map((item) => (
            <div key={item._id} className="cart-items-list">
              {showImage(item.product.productImage)}
              <div className="cart-items-name">{item.product.name}</div>
              <div className="cart-items-function">
                <button
                  className="cart-items-add"
                  onClick={() => addToCart(item.product._id)}
                >
                  +
                </button>
                {item.quantity > 1 && (
                  <button
                    className="cart-items-remove"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    -
                  </button>
                )}
                {item.quantity <= 1 && (
                  <button
                    className="cart-items-remove"
                    onClick={() => deleteCart(item.product._id)}
                  >
                    x
                  </button>
                )}
              </div>
              <div className="cart-items-price row">
                <span>
                  {item.quantity > 1
                    ? `(${item.quantity} items): £${item.product.price}`
                    : `(${item.quantity} item): £${item.product.price}`}
                </span>
                {item.product.discount > 0 && (
                  <span>{`(${item.product.discount}% off): ${Number(
                    item.product.currentPrice
                  ).toFixed(2)}`}</span>
                )}
              </div>
            </div>
          ))}
        {basketItems.length > 0 && (
          <>
            <div className="cart-items-total-price-name">
              Subtotal:
              <div className="cart-items-total-price">{`£${basketTotal.total}`}</div>
            </div>
            <div className="cart-items-total-price-name">
              Subtotal with Discount:
              <div className="cart-items-total-price">{`£${Number(
                basketTotal.totalWithDiscount
              ).toFixed(2)}`}</div>
            </div>
          </>
        )}
      </div>
    </Page>
  );
}

export default Home;
