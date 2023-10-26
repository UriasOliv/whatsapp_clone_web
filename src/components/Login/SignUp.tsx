import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";

import { FieldsLoginValidation } from './utils/yupLogin'
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface FormSignUp {
    username: string;
    password: string;
}

export default function SignUp() {
    const formik = useFormik<FormSignUp>({
        initialValues: {
            username: '',
            password: ''
        },

        validationSchema: FieldsLoginValidation(),

        onSubmit: ((values, actions) => {
            console.log(values)
            actions.resetForm()
        })
    })

    const navigate = useNavigate()

    return (
        <VStack
        as= "form"
        w= {{ base: '20%', 'md': "500px" }}
        m= "auto"
        justify= "left"
        h= "100hv"
        spacing= "1rem"
        onSubmit={formik.handleSubmit}
        >
            <Heading>Criar Uma Conta</Heading>

            <FormControl isInvalid={(formik.errors.username && formik.touched.username) || false}>
                <FormLabel fontSize={'lg'}>Nome</FormLabel>
                <Input 
                    name="username"
                    placeholder="Digite seu nome aqui"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                />
                <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={(formik.errors.password && formik.touched.password) || false}>
                <FormLabel fontSize={'lg'}>Senha</FormLabel>
                <Input 
                    name="password"
                    placeholder="Digite sua senha aqui"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <ButtonGroup gap={5}>
                <Button colorScheme="teal">Criar Conta</Button>
                <Button
                    leftIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                >Voltar</Button>
            </ButtonGroup>

        </VStack>
    )
}