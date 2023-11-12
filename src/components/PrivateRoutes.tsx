import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import { AccountContext } from "./AccountContext";

const useAuth = () => {
    const { user } = useContext(AccountContext)
    return user?.loggedIn
}

export default function PrivateRoutes() {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={"/"} />
}