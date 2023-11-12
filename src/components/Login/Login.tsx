import {
    VStack,
    ButtonGroup,
    FormControl,
    FormLabel,
    Button,
    FormErrorMessage,
    Heading,
} from '@chakra-ui/react'
import { Input, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { FieldsLoginValidation } from './utils/yupLogin'
import { useContext, useState } from 'react'

import loginService from '../../services/login'
import { AccountContext } from '../AccountContext';

interface FormLogin {
    username: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate()
    const { setUser } = useContext(AccountContext)
    const [errorMessager , setErrorMessager] = useState("")

    const formik = useFormik<FormLogin>({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema: FieldsLoginValidation(),

        onSubmit: (values, actions) => {
            // eslint-disable-next-line no-debugger
            debugger
            loginService.authenticate(values).then(result => {
                setUser({
                    loggedIn: result?.loggedIn,
                    username: result?.username,
                })
                navigate('/home')
                actions.resetForm()
            }).catch(error => {
                setErrorMessager(error)
                actions.setFieldValue('password', '')
            })
        }
    })

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
            <Heading>
                Login
            </Heading>
            <Text as="p" color="red.500">{errorMessager}</Text>
            <FormControl isInvalid={(formik.errors.username && formik.touched.password) || false}>
                <FormLabel fontSize='lg'>Nome</FormLabel>
                <Input
                    name='username'
                    placeholder='Digite o Nome'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={(formik.errors.password && formik.touched.password) || false}>
                <FormLabel fontSize='lg'>Senha</FormLabel>
                <Input
                    autoComplete='off'
                    type='password'
                    name='password'
                    placeholder='Digite a senha'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <ButtonGroup pt='1rem'>
                <Button colorScheme='teal' type='submit'>Fazer Login</Button>
                <Button onClick={() => navigate('/register')}>Criar Conta</Button>
            </ButtonGroup>
        </VStack>
    )
}