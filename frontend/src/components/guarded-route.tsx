import React from 'react';
import {Navigate, To, Outlet } from "react-router-dom";

interface GuardedRouteProps {
    redirectPath: To;
}

const GuardedRoute = ({ redirectPath = '/' }: GuardedRouteProps) => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;
}
    
export default GuardedRoute;