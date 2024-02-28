import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {CreateUser} from "../../services/client.js";

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

const CreateUserForm = ({ onSuccess }) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    role: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be 20 characters or less')
                        .required('Required'),
                    // age: Yup.number()
                    //     .min(16, 'Must be at least 16 years of age')
                    //     .max(100, 'Must be less than 100 years of age')
                    //     .required(),
                    password: Yup.string()
                        .min(4, 'Must be 4 characters or more')
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    role: Yup.string()
                        .oneOf(
                            ['MANAGER', 'USER'],
                            'Invalid Role'
                        )
                        .required('Required'),
                })}
                onSubmit={(user, {setSubmitting}) => {
                    setSubmitting(true);
                    CreateUser(user)
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
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Jane"
                            />

                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />

                            <MyTextInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder={"pick a secure password"}
                            />

                            <MySelect label="Role" name="role">
                                <option value="">Select role</option>
                                <option value="MANAGER">Manager</option>
                                <option value="USER">User</option>
                            </MySelect>

                            <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateUserForm;