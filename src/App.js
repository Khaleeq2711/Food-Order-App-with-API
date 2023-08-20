import React, { useContext, useState } from "react";

import "./App.css";
import HeaderComponent from "./components/UI/Header";
import Meals from "./components/Meals/meals";
import Cart from "./components/Cart/Cart";
import UserForm from "./components/Form/UserForm";

import CartProvider from "./components/Context/cart-contextapi";
import { CartContextApi } from "./components/Context/cart-contextapi";

import Alert from "@mui/material/Alert";

function App() {
  const ctx = useContext(CartContextApi);
  const [cartShow, setCartShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [alert, setAlert] = useState(false);


  const CartOpenHandler = () => {
    setCartShow(true);
  };
  const CartCloseHandler = () => {
    setCartShow(false);
  };
  const CartOrderHandler = () => {
    setCartShow(false);
    setFormShow(true);
  };
  const FormCloseHandler = () => {
    setFormShow(false);
  };

  const FormOrderHandler = () => {
    //FETCH/////////////////////////
    
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
    setFormShow(false);
  };

  return (
    <CartProvider>
      {alert && (
        <div className="alert">
          <Alert severity="success"> Your Order Placed Successfuly-!</Alert>
        </div>
      )}
      <HeaderComponent onCartOpen={CartOpenHandler} />

      <Meals />
      {cartShow && (
        <Cart onCartClose={CartCloseHandler} onCartOrder={CartOrderHandler} />
      )}
      {formShow && (
        <UserForm
          onFormClose={FormCloseHandler}
          onFormOrder={FormOrderHandler}
        />
      )}
    </CartProvider>
  );
}

export default App;
