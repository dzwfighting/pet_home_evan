import React, {useState, useEffect, useRef} from "react"
import {useNavigate} from "react-router-dom";
import {
    AlertDialog,
    AlertDialogBody, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
    Divider,
    ButtonGroup,
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react'
import { MdFavoriteBorder } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import {useAuth} from "../context/AuthContext.jsx";
import {getUserByEmail} from "../../services/client.js";
import {ProductOperateCart, ProductOperateFavorite} from "../../services/product.js";
import imageCommingSoon from "../../assets/images/image_comming_soon.jpg"

export default function ProductCard({productId, image, name, category, price, introduce, fetchProducts, ifFavorite, ifInCart}) {
    const navigate = useNavigate();
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const {user} = useAuth();

    const fetchUser = async () => {
        console.log("to fetch user get userDetail: " + JSON.stringify(user))
        if (user) {
            console.log("user exist")
            const userDetail = await getUserByEmail(user.username);
            // console.log("ProductCard.jsx user Data: " + JSON.stringify(userDetail))
            return userDetail;
        }
    }

    useEffect(() => {
        console.log("ifInfavorite: " + ifFavorite + " incart: " + ifInCart)
        // if (!userRef.current || !userRef.current.email) {
        //     fetchUser();
        // } else setFlag();
        if (!user && !user.data) {
            fetchUser();
            fetchProducts();
        }
    }, [user, ifFavorite, ifInCart])
    
    const handleAddToCart = async () => {
        // console.log("in add to cart, user is: " + JSON.stringify(user))
        const userDetail = await fetchUser();
        // console.log("userId: " + JSON.stringify(userDetail))
        if (userDetail) {
            // console.log("will add this product in cart, the user id is: " + userDetail.data.userId)
            const res = await ProductOperateCart(userDetail.data.userId, { productId, image, name, category, price, introduce }, 1);
            // console.log("after add to cart, res is: " + JSON.stringify(res));
            if (res) {
                navigate(0)
            }
        } else console.log("appear error when add product to cart")
    }
    
    const handleCancelAddToCart = async () => {
      // console.log("I will delete a prod, user info is: " + JSON.stringify(user));
      const userDetail = await fetchUser();
      if (userDetail) {
          const res = await ProductOperateCart(userDetail.data.userId, {productId, image, name, category, price, introduce }, -1);
          if (res) {
              navigate(0)
          }
      } else console.log("appear error when cancel product to cart")

    }
    
    const handleCollect = async () => {
        console.log("will collect this product, check user if exist: " + JSON.stringify(user));
        const userDetail = await fetchUser();
        if (userDetail) {
            const res = await ProductOperateFavorite(userDetail.data.userId, { productId, image, name, category, price, introduce }, 1);
            if (res) {
                navigate(0)
            }
        } else console.log("appear error when collect product")
    }
    
    const handleDisCollect = async () => {
        // await setOldUser(getUserByEmail(user.username));
        console.log("will cancel favorite");
        const userDetail = await fetchUser();
        if (userDetail) {
            const res = await ProductOperateFavorite(userDetail.data.userId, {productId, image, name, category, price, introduce}, -1);
            if (res) {
                navigate(0)
            }
        } else console.log("appear error when dislike product")
    }

    return (
        <Card maxW='sm'>
            <CardBody>
                {image ?
                    <Image
                        src={image}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    :
                    <Image
                        src={imageCommingSoon}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                }

                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{name}</Heading>
                    <Text>
                        {introduce}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        ${price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    {ifInCart ? (<Button variant='ghost' colorScheme='blue' onClick={handleCancelAddToCart}>
                        Added
                    </Button>) : (<Button variant='ghost' colorScheme='blue' onClick={handleAddToCart}>
                        Add to cart
                    </Button>)}
                    <Button>{ifFavorite ? <FcLike onClick={handleDisCollect}/> : <MdFavoriteBorder onClick={handleCollect}/>}</Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}