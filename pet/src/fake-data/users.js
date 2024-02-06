let users = [
  {
    email: "user1@gmail.com",
    password: "123456",
    collections: ["11"],
    cart: [{ proId: "11", cnt: "2" }],
    uploads: [
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    ],
  },
  {
    email: "user2@gmail.com",
    password: "123456",
    collections: ["12", "13"],
    cart: [
      { proId: "12", cnt: "1" },
      { proId: "13", cnt: "2" },
    ],
    uploads: [
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1542650507-17d51cecbbb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1942&q=80",
    ],
  },
];

let findUser = (email) => {
  let userIdx = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      userIdx = i;
      break;
    }
  }
  return userIdx;
};

export const findUserData = (email) => {
  let userIdx = findUser(email);
  return users[userIdx];
};

export let addCollect = (email, collect) => {
  let userIdx = findUser(email);

  // console.log("add succes");
  users[userIdx].collections.push(collect);
  console.log(users[userIdx]);
  return users[userIdx];
};

export let deleteCollect = (email, delId) => {
  let userIdx = findUser(email);

  let delIdx = 0;
  for (let i = 0; i < users[userIdx].collections.length; i++) {
    if (users[userIdx].collections[i] === delId) {
      delIdx = i;
      break;
    }
  }

  users[userIdx].collections.splice(delIdx, 1);
  console.log("del success");
  console.log(users[userIdx].collections);
  return users[userIdx];
};

export let addCart = (email, addId) => {
  let userIdx = findUser(email);
  let ifFind = false;
  for (let i = 0; i < users[userIdx].cart.length; i++) {
    if (users[userIdx].cart[i].proId === addId) {
      ifFind = true;
      users[userIdx].cart[i].cnt = (
        Number(users[userIdx].cart[i].cnt) + 1
      ).toString();
      break;
    }
  }

  if (!ifFind) {
    users[userIdx].cart.push({ proId: addId, cnt: "1" });
  }
  console.log(users[userIdx]);
  return users[userIdx];
};

export const delCart = (email, delId) => {
  let userIdx = findUser(email);
  for (let i = 0; i < users[userIdx].cart.length; i++) {
    if (users[userIdx].cart[i].proId === delId) {
      users[userIdx].cart.splice(i, 1);
      break;
    }
  }
  console.log(users[userIdx]);
  return users[userIdx];
};

export const delOnePro = (email, delId) => {
  let userIdx = findUser(email);
  console.log(delId);
  console.log(users[userIdx]);
  for (let i = 0; i < users[userIdx].cart.length; i++) {
    if (users[userIdx].cart[i].proId === delId) {
      console.log("start delete");
      let delOne = Number(users[userIdx].cart[i].cnt) - 1;
      console.log(delOne);
      if (delOne == 0) {
        delCart(email, delId);
        break;
      } else {
        users[userIdx].cart[i].cnt = delOne.toString();
        break;
      }
    }
  }
  console.log(users[userIdx]);
  return users[userIdx];
};
export default users;
