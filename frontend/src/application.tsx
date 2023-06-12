import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Group, Map, ManageAccounts, PersonAdd } from '@mui/icons-material';

import ROUTES from './consts/routes';

import classes from './application.module.css';

const Application = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate(ROUTES.MATCHING_PAGE.PATH);
        }
    }, []);

    return (
        <main className={classes.application}>
            <Outlet />
            <BottomNavigation>
                <BottomNavigationAction
                    label='Swipe'
                    icon={<Group />}
                    component={Link}
                    to={ROUTES.MATCHING_PAGE.PATH}
                />
                <BottomNavigationAction
                    label='Matches'
                    icon={<Map />}
                    component={Link}
                    to={ROUTES.MATCHES_PAGE.PATH}
                />
                <BottomNavigationAction
                    label='Profile'
                    icon={<ManageAccounts />}
                    component={Link}
                    to={ROUTES.PROFILE_PAGE.PATH}
                />
                <BottomNavigationAction
                    label='Register'
                    icon={<PersonAdd />}
                    component={Link}
                    to={ROUTES.REGISTER_PAGE.PATH}
                />
            </BottomNavigation>
        </main>
    );
};

export default Application;
