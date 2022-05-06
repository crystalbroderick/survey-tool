import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Dashboard from '../Dashboard/Dashboard';


function PrivateRoute({ children })  {
    const { currentUser } = useAuth();
    console.log(currentUser)
    
    return currentUser ? children : <Navigate to="/login" />
}

export default PrivateRoute
