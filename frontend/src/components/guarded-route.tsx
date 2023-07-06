import React from 'react';
import {
    Navigate,
    To,
    Outlet
} from "react-router-dom";

interface GuardedRouteProps {
    redirectPath: To;
}

const GuardedRoute = ({ redirectPath = '/' }: GuardedRouteProps) => {
    const token = localStorage.getItem('token');
    
    return (
        token ? <Outlet /> : <Navigate to={redirectPath} />
    );  
}
    
export default GuardedRoute;