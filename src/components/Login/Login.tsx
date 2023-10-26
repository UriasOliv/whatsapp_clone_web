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
import * as Yup from 'yup'

interface MyFormValues {
    username: string;
    password: string;
}

export default function Login() {
    const formik = useFormik<MyFormValues>({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema: Yup.object({
            username: Yup.string()
            .required('Nome é Obrigatório!')
            .min(6, 'Nome muito curto!')
            .max(28, 'Nome muito grande!'),

            password: Yup.string()
            .required('Senha é Obrigatória!')
            .min(6, 'Senha muito curta!')
            .max(28, 'Senha muito grande!'),
        }),

        onSubmit: (values, actions) => {
            alert(JSON.stringify(values, null, 2))
            actions.resetForm()
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
        >
            <Heading>
                Login
            </Heading>
            <FormControl>
                <FormLabel fontSize='lg'>Nome</FormLabel>
                <Input
                    name='username'
                    placeholder='Digite o Nome'
                />
                <FormErrorMessage>Invalid username</FormErrorMessage>
            </FormControl>

            <FormControl>
                <FormLabel fontSize='lg'>Senha</FormLabel>
                <Input
                    autoComplete='off'
                    type='password'
                    name='password'
                    placeholder='Digite a senha'
                />
                <FormErrorMessage>Invalid password</FormErrorMessage>
            </FormControl>

            <ButtonGroup pt='1rem'>
                <Button colorScheme='teal'>Log In</Button>
                <Button>Create Account</Button>
            </ButtonGroup>
        </VStack>
    )
}