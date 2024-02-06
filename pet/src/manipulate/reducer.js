import users from "../fake-data/users";

const initialState = {
  curUser: null,
  // cartItems: [],
  // totalQuantity: 0,
  // totalAmount: 0,
  // collectItems: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        curUser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        curUser: null,
      };
    case "REGISTER":
      users.push(action.payload);
      return {
        ...state,
        curUser: action.payload,
      };
    // case "ADDCART":
    //   const newItem = action.payload;
    //   const existItem = state.cartItems.find((item) => item.id === newItem.id);
    //   state.totalQuantity++;
    //   if (!existItem) {
    //     state.cartItems.push({
    //       id: newItem.id,
    //       title: newItem.title,
    //       iamge: newItem.image,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //     });
    //   } else {
    //     existItem.quantity++;
    //     existItem.totalPrice =
    //       Number(existItem.totalPrice) + Number(newItem.price);
    //   }

    //   state.totalAmount = state.cartItems.reduce(
    //     (total, item) => total + Number(item.price) * Number(item.quantity),
    //     0
    //   );
  }
  return state;
};
export default rootReducer;
