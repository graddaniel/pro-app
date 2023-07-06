import React from 'react';
import {
    Navigate,
    To,
    Outlet
} from "react-router-dom";

interface AnonymousRouteProps {
    redirectPath: To;
}

const AnonymousRoute = ({ redirectPath = '/' }: AnonymousRouteProps) => {
    const token = localStorage.getItem('token');
    
    return (
        token ? <Navigate to={redirectPath} /> : <Outlet />
    );  
}
    
export default AnonymousRoute;