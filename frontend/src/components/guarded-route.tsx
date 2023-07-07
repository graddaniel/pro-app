import React from 'react';
import {
    Navigate
} from "react-router-dom";

import ROUTES from '../consts/routes';

interface GuardedRouteProps {
    children: React.ReactElement;
}

const GuardedRoute = ({ children }: GuardedRouteProps) => {
    const token = localStorage.getItem('token');
    
    return token ? children : <Navigate to={ROUTES.LOGIN_PAGE.PATH} />;
}
    
export default GuardedRoute;