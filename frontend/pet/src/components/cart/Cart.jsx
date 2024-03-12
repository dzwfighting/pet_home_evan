import React, {useEffect, useState} from "react";
import SidebarWithHeader from "../shared/SideBar.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {getUserByEmail} from "../../services/client.js"
import CartCard from "./CartCard.jsx";


import {
  Wrap,
  WrapItem,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const {user} = useAuth();

  const fetchUserData = async () => {
    // console.log("in fetchUserData, user is: " + JSON.stringify(user))
    if (user) {
      const res = await getUserByEmail(user.username);
      // console.log("in fetchUserData, res is: " + JSON.stringify(res))
      await setUserData(res.data);
      console.log("in fetchUser, userData get, userData is: " + await userData);
    }
  }

  useEffect(() => {
    if (user) fetchUserData();
  }, [user])

  useEffect(() => {
    setLoading(true);
    if (user && userData) {
      console.log("the cartProds is: " + JSON.stringify(userData.cartProds))
      setLoading(false);
    }
  }, [userData, user])

  if (loading) {
    return (<SidebarWithHeader>
      <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
      />
    </SidebarWithHeader>)
  }

  if (!user || !userData.cartProds) {
    return <SidebarWithHeader>
      <Text>Cart Empty ~ </Text>
    </SidebarWithHeader>
  }

  return <SidebarWithHeader>
    <Wrap justify={"center"} spacing={"30px"}>
      {userData.cartProds.map((cartProd, index) => (
          <WrapItem key={index} sx={{ width: '100%' }}>
            <CartCard
                {...cartProd}
                userId={userData.userId}
            />
          </WrapItem>
      ))}
    </Wrap>
  </SidebarWithHeader>
}

export default Cart;