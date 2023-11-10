import {
    VStack,
    ButtonGroup,
    FormControl,
    FormLabel,
    Button,
    FormErrorMessage,
    Heading,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { FieldsLoginValidation } from './utils/yupLogin'

import loginService from '../../services/login'

interface FormLogin {
    username: string;
    password: string;
}

export default function Login() {
    const formik = useFormik<FormLogin>({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema: FieldsLoginValidation(),

        onSubmit: (values, actions) => {
            loginService.authenticate(values).then(result => {
                console.log(result)
                actions.resetForm()
            }).catch(error => {
                console.log(error)
            })
        }
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
            <Heading>
                Login
            </Heading>
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