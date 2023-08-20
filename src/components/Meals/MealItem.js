import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { CartContextApi } from "../Context/cart-contextapi";

const MealItem = (props) => {
  const ctx = useContext(CartContextApi);

  const CartHandler = (amount) => {
    ctx.addItem({ 
      key: props.id,
      id: props.id,
      name: props.name,
      amount: +amount,
      price: props.price,
    });
  };

  return (
    <li>
      <div className={classes["meal-main"]}>
        <div className={classes.meal}>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>$ {props.price}</div>
        </div>
        <div>
          <MealItemForm id={props.id} onAddToCart={CartHandler} />
        </div>
      </div>
    </li>
  );
};

export default MealItem;
