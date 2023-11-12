import { createContext, useState, ReactNode, useEffect } from 'react'
import loginService from '../services/login';
import { useNavigate } from 'react-router-dom';

interface UserContextProps {
    children: ReactNode;
}

interface LoggedInProps {
    username?: string;
    loggedIn: boolean | undefined;
}

interface AccountContextProps {
    user: LoggedInProps;
    setUser: (value: LoggedInProps) => void;
}

export const AccountContext = createContext<AccountContextProps>({
    user: { loggedIn: undefined},
    setUser: () => {}
})

const UserContext = ({children}: UserContextProps) => {
    const [user, setUser] = useState<LoggedInProps>({ loggedIn: undefined })

    const navigate = useNavigate()

    useEffect(() => {
        loginService.checkToken().then(result => {
            setUser({
                username: result?.username,
                loggedIn : result?.loggedIn,
            })
            navigate('/home')
        }).catch(() => {
            setUser({ loggedIn : false })
        })
    }, [])

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    )
}

export default UserContext