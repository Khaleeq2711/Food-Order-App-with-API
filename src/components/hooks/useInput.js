import { useReducer } from "react";

const inputInitialState = {
  value: "",
  touched: false,
};
const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, touched: state.touched };
  }
  if (action.type === "BLUR") {
    return { touched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return inputInitialState;
  }
  return { touched: state.touched, value: state.value };
};

const useInput = (valueFun) => {
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    inputInitialState
  );

  // const [enteredValue, setEnteredValue] = useState("");
  // const [valueTouched, setValueTouched] = useState(false);

  const valueValidity = valueFun(inputState.value);

  const valueChangeHandler = (e) => {
    inputDispatch({ type: "INPUT", value: e.target.value });
  };
  const valueBlurHandler = () => {
    inputDispatch({ type: "BLUR" });
    // setValueTouched(true);
  };
  const reset = () => {
    //can not do changings with useref, coz should not Manipulate DOM
    inputDispatch({ type: "RESET" });
  };

  const classInvalid = !valueValidity && inputState.touched;
  return {
    enteredValue: inputState.value,
    valueValidity,
    classInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
