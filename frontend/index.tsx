import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import {
    createRoot
} from 'react-dom/client';
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
import RegistrationPage from './src/pages/registration/registration-page';
import LoginPage from './src/pages/login/login-page';
import CreateProfilePage from './src/pages/create-profile-page';

import loginAction from './src/actions/login-page-action';
import registrationAction from './src/actions/registration-page-action';

import ROUTES from './src/consts/routes';
import matchingPageLoader from './src/loaders/matching-page-loader';
import matchingPageAction from './src/actions/matching-page-action';
import createProfileAction from './src/actions/create-profile-action';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Application />}
        >
            <Route
                path={ROUTES.MATCHING_PAGE.PATH}
                element={<MatchingPage />}
                loader={matchingPageLoader}
                action={matchingPageAction}
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
                path={ROUTES.CREATE_PROFILE_PAGE.PATH}
                element={<CreateProfilePage />}
                action={createProfileAction}
            />
            <Route
                path={ROUTES.REGISTRATION_PAGE.PATH}
                element={<RegistrationPage />}
                errorElement={<RegistrationPage />}
                action={registrationAction}
            />
            <Route
                path={ROUTES.LOGIN_PAGE.PATH}
                element={<LoginPage />}
                errorElement={<LoginPage />}
                action={loginAction}
            />
        </Route>
    )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
