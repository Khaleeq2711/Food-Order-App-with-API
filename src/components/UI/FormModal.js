import React from "react";
import ReactDoM from "react-dom";

import classes from "./FormModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCartClose}></div>;
};

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const FormModal = (props) => {
  return (
    <>
      {ReactDoM.createPortal(<Backdrop onCartClose={props.onCartClose}/>, document.getElementById("portal-form"))}
      {ReactDoM.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("portal-form")
      )}
    </>
  );
};

export default FormModal;
