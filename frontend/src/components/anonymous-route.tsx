import React from 'react';
import {
    Navigate
} from 'react-router-dom';

import ROUTES from '../consts/routes';

interface AnonymousRouteProps {
    children: React.ReactElement;
}

const AnonymousRoute = ({ children }: AnonymousRouteProps) => {
    const token = localStorage.getItem('token');

    return token ? <Navigate to={ROUTES.MATCHING_PAGE.PATH} /> : children;
};

export default AnonymousRoute;