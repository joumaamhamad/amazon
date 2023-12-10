import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

// This component used for routes need authentication
// If i go to the path he check if the user is exist

export default function ProtectedRoutes({children}) {

    const { state } = useContext(Store);
    const { userInfo } = state;

return userInfo ? children : <Navigate to='/signin' />
}
