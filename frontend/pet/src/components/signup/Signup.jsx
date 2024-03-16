import React, {useState, useEffect} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import CreateUserForm from "../shared/CreateUserForm.jsx";
import {Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";


const Signup = () => {
    const navigate = useNavigate();
    const {user, setUserFromToken} = useAuth();


    useEffect(() => {
        if (user) navigate("/products");
    })

  return (
      <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
      <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
              <Image
                  src={"https://user-images.githubusercontent.com/40702606/210880158-e7d698c2-b19a-4057-b415-09f48a746753.png"}
                  boxSize={"200px"}
                  alt={"Evan Logo"}
                  alignSelf={"center"}
              />
              <Heading fontSize={'2xl'} mb={15}>Register for an account</Heading>
              <CreateUserForm onSuccess={(token) => {
                  localStorage.setItem("access_token", token)
                  setUserFromToken()
                  navigate("/");
              }}/>
              <Link color={"blue.500"} href={"/"}>
                  Have an account? Login now.
              </Link>
          </Stack>
      </Flex>
      <Flex
          flex={1}
          p={10}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={{sm: 'linear(to-r, blue.600, purple.600)'}}
      >
          <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
              <Link target={"_blank"} href={"https://amigoscode.com/courses"}>
                  Enrol Now
              </Link>
          </Text>
          <Image
              alt={'Login Image'}
              objectFit={'scale-down'}
              src={
                  'https://user-images.githubusercontent.com/40702606/215539167-d7006790-b880-4929-83fb-c43fa74f429e.png'
              }
          />
      </Flex>
  </Stack>)
}

export default Signup;