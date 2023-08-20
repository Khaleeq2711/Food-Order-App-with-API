import React, { useContext, useEffect, useState } from "react";

import CartIcon from "./CartIcon";
import classes from "./CartButton.module.css";
import { CartContextApi } from "../Context/cart-contextapi";

const CartButton = (props) => {
  const ctx = useContext(CartContextApi);

  const [btnBump, setBtnBump] = useState(false);

  const num_items = ctx?.items?.reduce((prevValue, item) => {
    return prevValue + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnBump ?classes.bump : ''}`;

  useEffect(()=>{
    if(ctx.items.lengh===0){
        return;
    }
    setBtnBump(true);

    setTimeout(() => {
        setBtnBump(false);
    }, 300);
  }, [ctx.items])

  return (
    <button className={btnClasses} onClick={props.onCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{num_items}</span>
    </button>
  );
};

export default CartButton;
