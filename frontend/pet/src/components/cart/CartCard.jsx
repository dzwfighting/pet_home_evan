import React, {useState, useEffect} from "react";

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
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import imageCommingSoon from "../../assets/images/image_comming_soon.jpg";

import {useNavigate} from "react-router-dom";
import {ProductOperateCart} from "../../services/product.js";


const CartCard = ({cartId, quantity, product, userId}) => {
  const [newQuantity, setNewQuantity] = useState(0);
  const navigate = useNavigate();

  const handleChangeQuantity = async (e) => {
    const target = parseInt(e.target.value, 10);
    if (!isNaN(target) && target >= 0) setNewQuantity(target);
    // console.log("newQuantity is : " + newQuantity);
    const res = await ProductOperateCart(userId, product, target);
    // console.log("after set product, the new user res is: " + JSON.stringify(res.data));
    navigate(0);
  }

  const handleAddProd = async () => {
    const res = await ProductOperateCart(userId, product, 1);
    // console.log("after plus 1, the new user res is: " + JSON.stringify(res.data));
    navigate(0);
  }

  const handleMinusProd = async () => {
    const res = await ProductOperateCart(userId, product, -1);
    // await console.log("after minus 1, the new user res is: " + JSON.stringify(res.data));
    navigate(0)
  }

  const handleClearProd = async () => {
    const res = await ProductOperateCart(userId, product, -quantity);
    // console.log("after clear, the new user res is: " + JSON.stringify(res.data));
    navigate(0);
  }


  return <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        sx={{ width: '65%' }}
    >
      {product.image ?
          <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={product.image}
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
          <Heading size='md'>{product.name}</Heading>
          <Text py='2'>
            {product.introduce}
          </Text>
        </CardBody>

        <CardFooter>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button size='sm' boxSize="40px" mr={2} onClick={handleAddProd}>
              <GoPlus size={30}/>
            </Button>
            <Input
                textAlign="center"
                htmlSize={1}
                width='auto'
                value={quantity}
                mr={2}
                onChange={handleChangeQuantity}
            />
            <Button size='sm' boxSize="40px" mr={4} onClick={handleMinusProd}>
              <FiMinus size={30}/>
            </Button>
            <Button size='sm' boxSize="40px" onClick={handleClearProd}>
              <FaRegTrashAlt />
            </Button>


          </div>
        </CardFooter>
      </Stack>
    </Card>

}

export default CartCard;