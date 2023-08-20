import React, { useRef, useState } from "react";

import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountValidity, setAmountValidity] = useState(true);
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmountS = amountRef.current.value;
    const enteredAmount = +enteredAmountS;
    if (
      enteredAmountS.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountValidity(false);
      return;
    }
    setAmountValidity(true);
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label={"Amount"}
        reference={amountRef}
        input={{
          key: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValidity && <p>Enter Valid Amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
