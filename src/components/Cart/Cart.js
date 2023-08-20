import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import { CartContextApi } from "../Context/cart-contextapi";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import Alert from "@mui/material/Alert";

const Cart = (props) => {
  const [alertEmpty, setAlertEmpty] = useState(false);
  const ctx = useContext(CartContextApi);

  const addItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };
  const orderCartHandler = () => {
    if (ctx.items.length === 0) {
      setAlertEmpty(true);
    } else {
      setAlertEmpty(false);
      props.onCartOrder();
    }
    console.log(alertEmpty);

    setTimeout(() => {
      setAlertEmpty(!alertEmpty);
    }, 3000);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx?.items?.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={removeItemHandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onCartClose={props.onCartClose}>
      <div className={classes["cart-items"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Total:</span>
          <span>{ctx.totalAmount.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
          <button
            className={classes["button--close"]}
            onClick={props.onCartClose}
          >
            Close
          </button>
          <button className={classes.button} onClick={orderCartHandler}>
            Order
          </button>
          {alertEmpty && <Alert severity="error"> Your Cart is Empty-!</Alert>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
