import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useHistory } from 'react-router-dom'
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider(props) {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged(user => {
            setLoading(false)
            if (user) {
                const { displayName, email, uid, photoURL } = user
                setUser({
                    displayName, email, uid, photoURL
                });
                history.push('/');
                return
            }
            history.push('/login')
        });
        return () => {
            unsubscribed()
        }
    }, [ history])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : props.children}
            {/* {props.children} */}
        </AuthContext.Provider>
    );
}


