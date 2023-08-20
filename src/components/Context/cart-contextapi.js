import React, { useReducer } from "react";

export const CartContextApi = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  emptyCart: ()=>{}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log(action);
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    // If the item already exists in the array then update it's quantity and price

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCart;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
    console.log("Item Added, ID: ", item.id);
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
    console.log("Item removed ID: ", id);
  };
  const emptyItemHandler = (id) => {
    dispatchCartState({ type: "EMPTY" });
    console.log("Order Placed..!");
  };

  const ctx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    emptyCart: emptyItemHandler
  };

  return (
    <CartContextApi.Provider value={ctx}>
      {" "}
      {props.children}{" "}
    </CartContextApi.Provider>
  );
};

export default CartProvider;
