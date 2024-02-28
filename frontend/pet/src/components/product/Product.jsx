import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "../shared/SideBar.jsx"
import { useEffect, useState } from 'react';
import ProductCard from "../product/ProductCard.jsx";
import {getProducts, postProducts} from "../../services/product.js"
import {useAuth} from "../context/AuthContext.jsx";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = () => {
        setLoading(true);
        getProducts().then(res => {
            console.log(res);
            setProducts(res.data);
        }).catch(e => {
            console.log(e);
            throw e;
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchProducts();
    }, products)

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

    if (products.length <= 0) {
        return (
            <SidebarWithHeader>
                <Text>No Products available</Text>
            </SidebarWithHeader>
        )
    }

    return <SidebarWithHeader>
        <Wrap justify={"center"} spacing={"30px"}>
            {products.map((product, index) => (
                <WrapItem key={index}>
                    <ProductCard
                        {...product}
                        fetchProducts={fetchProducts}
                    />
                </WrapItem>
            ))}
        </Wrap>
    </SidebarWithHeader>
}

export default Product;