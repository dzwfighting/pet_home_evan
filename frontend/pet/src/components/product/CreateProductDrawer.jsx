import React, {useState, useEffect} from "react";

import CreateProductForm from "../product/CreateProductForm.jsx";

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";

const AddIcon = () => "+";
const CloseIcon = () => "x";

const CreateProductDrawer = ({fetchProducts}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Button
            leftIcon={<AddIcon/>}
            colorScheme={"teal"}
            onClick={onOpen}
        >
            Create product
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create new Product</DrawerHeader>

                <DrawerBody>
                    <CreateProductForm
                        onSuccess={fetchProducts}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<CloseIcon/>}
                        colorScheme={"teal"}
                        onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}

export default CreateProductDrawer;