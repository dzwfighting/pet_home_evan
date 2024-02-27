import { useState, useEffect } from 'react';
import {getUsers} from "./services/client.js"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Wrap, WrapItem, Spinner, Text, Button} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import Card from "./components/user/Card.jsx";

const User = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = () => {
        setLoading(true);
        getUsers().then(res => {
            console.log(res);
            setCustomers(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }
    useEffect(() => {
        fetchCustomers();
    }, [])

    if (loading) {
        <SidebarWithHeader>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </SidebarWithHeader>
    }

    if (customers.length <= 0) {
        return (
            <SidebarWithHeader>
                <Text>No Customer available</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Wrap justify={"center"} spacing={"30px"}>
                {customers.map((customer, index) => (
                    <WrapItem  key={index}>
                        <Card {...customer}/>
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>

    )
}

export default User;
