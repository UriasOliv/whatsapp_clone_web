import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import {Text} from '@chakra-ui/react'

import Login from './Login/Login'
import SignUp from './Login/SignUp'
import PrivateRoutes from './PrivateRoutes'
import { AccountContext } from './AccountContext'

function RenderRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Text>LOGADOOOO</Text>}></Route>
            </Route>
            <Route path="/*" element={<Login />}></Route>
        </Routes>
    )
}

export default function Views() {
    const { user } = useContext(AccountContext)

    return user.loggedIn === undefined ? <Text>CARREGANDO...</Text> : RenderRoutes()
}