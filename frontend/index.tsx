import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';

import Application from './src/application';
import MatchingPage from './src/pages/matching-page';
import MatchesPage from './src/pages/matches-page';
import ProfilePage from './src/pages/profile-page';
import RegisterPage from './src/pages/register/register-page';
import LoginPage from './src/pages/login/login-page';

import ROUTES from './src/consts/routes';
import { registerAction } from './src/pages/register/register-form';
import { loginAction } from './src/pages/login/login-form';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<Application />}
        >
            <Route
                path={ROUTES.MATCHING_PAGE.PATH}
                element={<MatchingPage />}
            />
            <Route
                path={ROUTES.MATCHES_PAGE.PATH}
                element={<MatchesPage />}
            />
            <Route
                path={ROUTES.PROFILE_PAGE.PATH}
                element={<ProfilePage />}
            />
            <Route
                path={ROUTES.REGISTER_PAGE.PATH}
                element={<RegisterPage />}
                action={registerAction}
            />
            <Route
                path={ROUTES.LOGIN_PAGE.PATH}
                element={<LoginPage />}
                action={loginAction}
            />
        </Route>
    )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
