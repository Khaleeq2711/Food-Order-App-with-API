import React, { useContext, useEffect, useState } from "react";

import FormModal from "../UI/FormModal";
import { CartContextApi } from "../Context/cart-contextapi";
import classes from "./UserForm.module.css";
import FormItem from "./FormItem";

import { TextareaAutosize } from "@mui/material";
import useInput from "../hooks/useInput";
import useHttp from "../hooks/useHttp";

const UserForm = (props) => {
  const [formValidity, setformValidity] = useState(false);
  const { loading, error, httpRequest } = useHttp();

  const ctx = useContext(CartContextApi);

  const orderFormHandler = (e) => {
    e.preventDefault();

    const order = {
      name: enteredName,
      address: enteredAddress,
      phone: enteredPhone,
      orderedMeals: ctx.items,
      totalAmount: ctx.totalAmount.toFixed(2),
    };

    const httpDataHandler = (data) => {
      const newOrder = {
        id: data.name, // firebase-specific => "name" contains generated id
        ...order,
      };
      console.log(newOrder);
    };
    httpRequest(
      {
        url: "https://react-http-testing-f9590-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          id: Math.random(),
          name: enteredName,
          address: enteredAddress,
          phone: enteredPhone,
          orderedMeals: [...ctx.items],
          totalAmount: ctx.totalAmount.toFixed(2),
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      httpDataHandler
    );
    if (!loading && !error) {
      props.onFormOrder();
      ctx.emptyCart();
    }
  };

  const {
    enteredValue: enteredName,
    valueValidity: nameValidity,
    classInvalid: nameClassInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((name) => {
    return name.trim().length >= 3;
  });

  const {
    enteredValue: enteredAddress,
    valueValidity: addressValidity,
    classInvalid: addressClassInvalid,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
  } = useInput((address) => {
    return address.trim().length !== 0;
  });

  const {
    enteredValue: enteredPhone,
    valueValidity: phoneValidity,
    classInvalid: phoneClassInvalid,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
  } = useInput((phone) => {
    return phone.toString().trim().length >= 11;
  });

  const cartItems = (
    <ul className={classes["form"]}>
      {ctx?.items?.map((item) => {
        return (
          <FormItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
          />
        );
      })}
    </ul>
  );

  useEffect(() => {
    if (nameValidity && addressValidity && phoneValidity) {
      setformValidity(true);
    } else {
      setformValidity(false);
    }
  });

  const nameClass =
    !nameClassInvalid && nameValidity
      ? classes.input + " " + classes.valid
      : classes.input;
  const addressClass =
    !addressClassInvalid && addressValidity
      ? classes.input + " " + classes.valid
      : classes.input;
  const phoneClass =
    !phoneClassInvalid && phoneValidity
      ? classes.input + " " + classes.valid
      : classes.input;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <FormModal onCartClose={props.onCartClose}>
      <div className={classes["form"]}>
        <header>Your Deatils</header>
        {cartItems}
        {ctx.totalAmount ? (
          <div className={classes.total}>
            <span>Total: </span>
            <span>{ctx.totalAmount.toFixed(2)}</span>
          </div>
        ) : (
          ""
        )}
        <form onSubmit={orderFormHandler}>
          <div className={nameClass}>
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type={"text"}
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameClassInvalid && <span>Please Enter Valid Name-!</span>}
          </div>

          <div className={addressClass}>
            <label htmlFor="address">Address </label>
            <input
              id="address"
              type={TextareaAutosize}
              value={enteredAddress}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
            {addressClassInvalid && <span>Address is Needed to Deliver-!</span>}
          </div>
          <div className={phoneClass}>
            <label htmlFor="phone">Phone </label>
            <input
              id="phone"
              type={"number"}
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              className={classes.number_input}
            />
            {phoneClassInvalid && (
              <span>Please Enter Valid Phone Number-!</span>
            )}
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--close"]}
              onClick={props.onFormClose}
            >
              Cancel
            </button>
            <button className={classes.button} disabled={!formValidity}>
              Order
            </button>
          </div>
        </form>
        {loading && <p>Loaading.....</p>}
        {error && <p>Something Went Wrong...</p>}
      </div>
    </FormModal>
  );
};

export default UserForm;
