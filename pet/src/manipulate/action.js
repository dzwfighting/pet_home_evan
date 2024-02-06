export const login = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const register = (newUser) => ({
  type: "REGISTER",
  payload: newUser,
});

// export const addToCart = (item) => ({
//   type: "ADDTOCART",
//   payload: item,
// });

// export const deleteFromCard = (item) => ({
//   typeof: "DELETEFROMCART",
//   payload: item,
// });

// export const addToCollect = (item) => ({
//   type: "ADDTOCOLLECT",
//   payload: item,
// });

// export const deleteFromColllect = (item) => ({
//   type: "DELETEFROMCOLLECT",
//   payload: item,
// });
