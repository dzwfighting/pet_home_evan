import React, {useState, useEffect} from "react"
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Text, Image } from '@chakra-ui/react'
import { MdFavoriteBorder } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import imageCommingSoon from "../../assets/images/image_comming_soon.jpg"

export default function ProductCard({id, image, name, category, price, introduce}) {
    const [ifCollect, setIfCollect] = useState(false);

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
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                    <Button>{ifCollect ? <FcLike /> : <MdFavoriteBorder/>}</Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}