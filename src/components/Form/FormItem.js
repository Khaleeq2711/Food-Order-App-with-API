import classes from "./FormItem.module.css";

const FormItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["form-item"]}>
      <div className={classes.name}>
        <h2>{props.name}</h2>
      </div>

      <div className={classes.summary}>
        <span className={classes.amount}>x {props.amount}</span>
        <span className={classes.price}>{price}</span>
      </div>
    </li>
  );
};

export default FormItem;
