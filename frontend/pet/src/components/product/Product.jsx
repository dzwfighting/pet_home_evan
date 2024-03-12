import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "../shared/SideBar.jsx"
import {useEffect, useState} from 'react';
import ProductCard from "../product/ProductCard.jsx";
import {getProducts} from "../../services/product.js"
import {getUserByEmail} from "../../services/client.js"
import CreateProductDrawer from "../product/CreateProductDrawer.jsx"
import {useAuth} from "../context/AuthContext.jsx";

const Product = () => {
    const [userDetail, setUserDetail] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ifFavorites, setIfFavorites] = useState(new Map());
    const [ifInCart, setIfInCart] = useState(new Map());

    const {user} = useAuth();
    
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

    const fetchUser = async () => {
        if (user) {
            const res = await getUserByEmail(user.username);
            setUserDetail(res.data);
            // console.log("Product.jsx user Data: " + JSON.stringify(userDetail))
        }
    }

    const fetchUserData = async () => {
        // console.log("in fetchUserData() userDetail: " + JSON.stringify(userDetail));
        try {
            if (user && userDetail) {
                const favoritesMap = new Map();
                // console.log("userDetail.cartProds: " + JSON.stringify(userDetail.cartProds))
                if (userDetail.favorites) {
                    userDetail.favorites.forEach((prod) => {
                        favoritesMap.set(prod.productId);
                    });
                    setIfFavorites(favoritesMap);
                }
                const cartProdsMap = new Map();
                if (userDetail.cartProds) {
                    userDetail.cartProds.forEach((cartProd) => {
                        // console.log("userDetail.cartProd: " + JSON.stringify(cartProd.product))
                        // console.log("cartProd " + JSON.stringify(cartProd.product.productId))
                        if (cartProd.product && cartProd.quantity > 0) {
                            // console.log("in cardProd to add in map")
                            cartProdsMap.set(cartProd.product.productId);
                            // console.log("in cardProd to add in map: " + cartProdsMap)
                        }
                    })
                    setIfInCart(cartProdsMap);
                }
                // console.log(" cartProdsMap: " + cartProdsMap)
            } else{
                console.log("user is null")
            }
        } catch (e) {
            console.log("Meet an error when get all favorites " + e);
        }
    }

    useEffect(() => {
        if (!user || !user.data) {
            fetchUser();
        }
    }, [user])

    useEffect(() => {
        fetchProducts();
        fetchUserData();
    }, [user, userDetail])

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

    if (products.length <= 0) {
        return (
            <SidebarWithHeader>
                <Text>No Products available</Text>
            </SidebarWithHeader>
        )
    }

    return <SidebarWithHeader>
        <CreateProductDrawer
            fetchProducts={fetchProducts}
        />
        <Wrap justify={"center"} spacing={"30px"}>
            {products.map((product, index) => (
                <WrapItem key={index}>
                    <ProductCard
                        {...product}
                        fetchProducts={fetchProducts}
                        ifFavorite={ifFavorites.has(product.productId)}
                        ifInCart={ifInCart.has(product.productId)}
                    />
                </WrapItem>
            ))}
        </Wrap>
    </SidebarWithHeader>
}

export default Product;