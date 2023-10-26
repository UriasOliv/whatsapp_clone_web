import * as Yup from 'yup'

export function FieldsLoginValidation() {
    return Yup.object({
        username: Yup.string()
        .required('Nome é Obrigatório!')
        .min(6, 'Nome muito curto!')
        .max(28, 'Nome muito grande!'),

        password: Yup.string()
        .required('Senha é Obrigatória!')
        .min(6, 'Senha muito curta!')
        .max(28, 'Senha muito grande!'),
    })
}