import React, {useState, useEffect} from "react";
import {
    Wrap,
    WrapItem,
    Spinner,
    Text,
    VStack
} from '@chakra-ui/react';

import FavoritesCard from "../favorites/FavoritesCard.jsx";
import SidebarWithHeader from "../shared/SideBar.jsx"
import {useAuth} from "../context/AuthContext.jsx"
import {getUserByEmail} from "../../services/client.js"

const Favorites = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const {user} = useAuth();

    const fetchUserData = async () => {
        const res = await getUserByEmail(user.username);
        setUserData(await res.data);
        // console.log("the fetch uerdata is: " + JSON.stringify(res));
    }

    useEffect(() => {
        if (user) fetchUserData();
    }, [user])

    useEffect(() => {
        setLoading(true);
        if (user && userData) {
            setLoading(false);
            // console.log("the userdata is: " + JSON.stringify(userData))
        }
    }, [user, userData])

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
    if (!user || !userData || !userData.favorites) {
        return <SidebarWithHeader>
            <Text>You have not collect any product~ </Text>
        </SidebarWithHeader>
    }

    return <SidebarWithHeader>
        <Wrap justify={"center"} spacing={"30px"}>
            {userData.favorites.map((favorite, index) => (
                <WrapItem key={index} sx={{ width: '100%' }}>
                    <FavoritesCard
                        {...favorite}
                        userId={userData.userId}
                    />
                </WrapItem>
            ))}
        </Wrap>
    </SidebarWithHeader>
}

export default Favorites;