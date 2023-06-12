import React, { FC } from 'react'

import { useProvideAuth, authContext } from './auth'


const ProvideAuth: FC = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}


export default ProvideAuth
