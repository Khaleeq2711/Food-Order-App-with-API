import React from "react";

import FoodImage from "../../assets/foodback.jpg";
import CartButton from "../Cart/CartButton";
import classes from "./Header.module.css";

const Header = (props) => {

  return (
    <>
      <header className={classes.header}>
        <h1><span className={classes.pinkLine}>Food</span> King</h1>
        <CartButton onCartOpen={props.onCartOpen}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={FoodImage} alt="Delioius Food Here..!" />
      </div>
    </>
  );
};

export default Header;
