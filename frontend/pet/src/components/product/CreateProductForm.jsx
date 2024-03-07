import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {postProducts} from "../../services/product.js";
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx"

const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const CreateProductForm = ({ onSuccess }) => {
    const [user, setUser] = useState(null);
    const {setUserFromToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(setUserFromToken());
    }, [])

    return (
        <>
            <Formik
                initialValues={{
                    imageURL: '',
                    name: '',
                    category: '',
                    price: 1,
                    introduce: ''
                }}
                validationSchema={Yup.object({
                    imageURL: Yup.string()
                        .url('Must be a valid URL')
                        .required('Required'),
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    category: Yup.string()
                        .oneOf(
                            ['CAT', 'DOG'],
                            'Invalid Category'
                        )
                        .required('Required'),
                    price: Yup.number()
                        .min(1, 'Must be at least $1')
                        .required(),
                    introduce: Yup.string()
                        .min(10, 'Must be at least 10 characters')
                        .required('Required'),
                    // password: Yup.string()
                    //     .min(4, 'Must be 4 characters or more')
                    //     .max(15, 'Must be 15 characters or less')
                    //     .required('Required'),

                })}
                onSubmit={(product, {setSubmitting}) => {
                    console.log("now I will add product, the data is: " + JSON.stringify(product));
                    console.log("now I will add product, the current user is: " + JSON.stringify(user));
                    if (user.role == "MANAGER") {
                        setSubmitting(true);
                        postProducts(product)
                            .then(res => {
                                console.log(res);
                                // successNotification(
                                //     "Customer saved",
                                //     `${customer.name} was successfully saved`
                                // )
                                onSuccess(res.headers["authorization"]);
                            }).catch(err => {
                            console.log(err);
                            // errorNotification(
                            //     err.code,
                            //     err.response.data.message
                            // )
                        }).finally(() => {
                            setSubmitting(false);
                        })
                    } else {
                        navigate("/")
                    }
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="imageURL"
                                name="imageURL"
                                type="text"
                                placeholder="https://bkimg.cdn.bcebos.com/pic/ca1349540923dd54e53377acdb09b3de9d8248b6?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_1000"
                            />
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Cat Home"
                            />

                            <MySelect label="Category" name="category">
                                <option value="">Select Category</option>
                                <option value="CAT">Cat</option>
                                <option value="DOG">Dog</option>
                            </MySelect>

                            <MyTextInput
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="20"
                            />

                            <MyTextInput
                                label="introduce"
                                name="introduce"
                                type="text"
                                placeholder="This is a Cat Home, long 5 inch, height 3 inch, width 5 inch"
                            />
                            <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateProductForm;