import { Routes, Route } from 'react-router-dom'

import Login from './Login/Login'
import SignUp from './Login/signUp'

export default function Views() {
    return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/*" element={<Login />}></Route>
        </Routes>
    )
}