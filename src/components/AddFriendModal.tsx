import { 
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
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
import * as Yup from 'yup'

interface AddFriendModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormAddFriend {
    friendName: string;
}

export default function AddFriendModal({ isOpen=true, onClose }: AddFriendModalProps) {

    const formik = useFormik<FormAddFriend>({
        initialValues: {
            friendName: ''
        },

        validationSchema: Yup.object({
            friendName: Yup.string(),
        }),

        onSubmit: (values, actions) => {
            console.log(values)
            onClose()
            actions.resetForm()
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />

                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormControl isInvalid={(formik.errors.friendName && formik.touched.friendName) || false}>
                            <FormLabel fontSize='lg'>Nome</FormLabel>
                            <Input
                                name='friendName'
                                placeholder='Digite o Nome'
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