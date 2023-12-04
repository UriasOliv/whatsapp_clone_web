import { 
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from 'yup'
import userService from "../services/user";

interface AddFriendModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormAddFriend {
    friendName: string;
}

export default function AddFriendModal({ isOpen=true, onClose }: AddFriendModalProps) {
    const [error, setError] = useState('')

    const closeModal = useCallback(() => {
        setError("")
        onClose()
    }, [onClose])

    const formik = useFormik<FormAddFriend>({
        initialValues: {
            friendName: ''
        },

        validationSchema: Yup.object({
            friendName: Yup.string(),
        }),

        onSubmit: (values, actions) => {
            userService.addFriend(values.friendName).then(() => {
                closeModal()
                actions.resetForm()
            }).catch(error => {
                setError(error)
            })
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Adicionando Amigo</ModalHeader>
                <ModalCloseButton />

                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <Heading
                            as="p"
                            color="red.500"
                            textAlign='center'
                            fontSize='md'
                        >
                            {error}
                        </Heading>
                        <FormControl isInvalid={(formik.errors.friendName && formik.touched.friendName) || false}>
                            <FormLabel fontSize='lg'>Nome</FormLabel>
                            <Input
                                name='friendName'
                                placeholder='Digite o Nome do Usuario'
                                onChange={formik.handleChange}
                                value={formik.values.friendName}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.friendName}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit">
                            Adicionar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}