import React, {useState, useEffect} from "react"
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

import {useNavigate} from "react-router-dom"
import SidebarWithHeader from "../shared/SideBar.jsx"
import {useAuth} from "../context/AuthContext.jsx"
import {getUserByEmail} from "../../services/client.js"
import {updateUser} from "../../services/client.js"

const Setting = () => {
    const [userData, setUserData] = useState([])
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isOpenUsername, setIsOpenUsername] = useState(false)
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const {user, logOut} = useAuth();
    const navigate = useNavigate();

    const onCloseUsername = () => setIsOpenUsername(false);
    const onOpenUsername = () => setIsOpenUsername(true);
    const onClosePassword = () => setIsOpenPassword(false);
    const onOpenPassword = () => setIsOpenPassword(true);

    const fetchUserData = async () => {
        if (user) {
            const res = await getUserByEmail(user.username);
            setUserData(await res.data);
        } else {
            console.log("user not exit")
        }
    }

    useEffect(() => {
        if (user) fetchUserData();
    }, [user])

    const handleChangeUsername = (e) => {
        setNewUsername(e.target.value);
    }

    const handleClickChangeUsername = async () => {
        if (user && userData) {
            const update = {...userData, name: newUsername};
            console.log("the update user is: " + JSON.stringify(update))
            // setUserData(update);
            // console.log("the newUserData is: " + userData)
            const res = await updateUser(update.userId, update);
            await console.log("after change username, the res is: " + JSON.stringify(res))
            navigate(0);
        } else {
            console.log("user or userData is null")
        }
    }

    const handleChangePassword = (e) => {
        // console.log("the new password is: " + e.target.value)
        setNewPassword(e.target.value)
    }

    const handleClickChangePassword = async () => {
        if (user && userData) {
            const update = {...userData, password: newPassword};
            // console.log("the update user is: " + JSON.stringify(update))
            // setUserData(update);
            // console.log("the newUserData is: " + JSON.stringify(userData))
            const res = await updateUser(update.userId, update);
            // await console.log("after change username, the res is: " + JSON.stringify(res))
            await logOut();
            await navigate("/");
        } else {
            console.log("user or userData is null")
        }
    }

  return <SidebarWithHeader>
      <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          sx={{ width: '65%' }}
          marginBottom={{sm: '20px'}}
      >
          <Stack marginLeft={{ base: 0, sm: '20px' }} >
              <CardBody>
                  <Heading size='md'>
                      <Button onClick={onOpenUsername}>
                          <Text fontStyle="italic">Change Username</Text>
                      </Button>
                      <AlertDialog
                          isOpen={isOpenUsername}
                          onClose={onCloseUsername}
                      >
                          <AlertDialogOverlay>
                              <AlertDialogContent>
                                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                      Change Username
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                      <Input placeholder="Enter new username" onChange={handleChangeUsername}/>
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                      <Button onClick={onCloseUsername}>Cancel</Button>
                                      <Button colorScheme="blue" ml={3} onClick={handleClickChangeUsername}>Update</Button>
                                  </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialogOverlay>
                      </AlertDialog>
                  </Heading>
              </CardBody>
          </Stack>
      </Card>
      <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          sx={{ width: '65%' }}
      >

          <Stack marginLeft={{ base: 0, sm: '20px' }}>
              <CardBody>
                  <Heading size='md'>
                      <Button onClick={onOpenPassword}>
                          <Text fontStyle="italic">Change Password</Text>
                      </Button>
                      <AlertDialog
                          isOpen={isOpenPassword}
                          onClose={onClosePassword}
                      >
                          <AlertDialogOverlay>
                              <AlertDialogContent>
                                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                      Change Password
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                      <Input placeholder="Enter new password" onChange={handleChangePassword}/>
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                      <Button onClick={onClosePassword}>Cancel</Button>
                                      <Button colorScheme="blue" ml={3} onClick={handleClickChangePassword}>Update</Button>
                                  </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialogOverlay>
                      </AlertDialog>
                  </Heading>

              </CardBody>
          </Stack>
      </Card>
  </SidebarWithHeader>
}

export default Setting;