import React, {useState} from "react";
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
    Input,
    Stack,
    Tag,
    Text,
    Divider,
    ButtonGroup,
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react'
import { FcLike } from "react-icons/fc";
import imageCommingSoon from "../../assets/images/image_comming_soon.jpg"

import {useNavigate} from "react-router-dom";
import {ProductOperateFavorite} from "../../services/product.js"

const FavoritesCard = ({productId, image, name, category, price, introduce, userId}) => {
    const navigate = useNavigate();
    const handleDisCollect = async () => {
        // console.log("handle disCollect")
      const res = await ProductOperateFavorite(userId, {productId, image, name, category, price, introduce}, -1);
      // console.log("delete success, the res is: " + await res)
      navigate(0);
    }
    return <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        sx={{ width: '65%' }}
    >
        {image ?
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={image}
                marginLeft={{ base: 0, sm: '20px' }}
            /> :
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={imageCommingSoon}
                marginLeft={{ base: 0, sm: '20px' }}
            />
        }

        <Stack marginLeft={{ base: 0, sm: '20px' }}>
            <CardBody>
                <Heading size='md'>{name}</Heading>
                <Text py='2'>
                    {introduce}
                </Text>
            </CardBody>

            <CardFooter>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button><FcLike onClick={handleDisCollect}/></Button>
                </div>
            </CardFooter>
        </Stack>
    </Card>
}

export default FavoritesCard;