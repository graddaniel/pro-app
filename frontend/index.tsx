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

import GuardedRoute from './src/components/guarded-route';
import AnonymousRoute from './src/components/anonymous-route';

import ROUTES from './src/consts/routes';
import loginAction from './src/actions/login-page-action';
import registrationAction from './src/actions/registration-page-action';

import matchingPageLoader from './src/loaders/matching-page-loader';
import matchingPageAction from './src/actions/matching-page.action';
import matchesPageLoader from './src/loaders/matches-page-loader';
import profilePageLoader from './src/loaders/profile-page-loader';
import createProfilePageLoader from './src/loaders/create-profile-page-loader';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<Application />}
        >
            <Route
                path={ROUTES.MATCHING_PAGE.PATH}
                element={
                    <GuardedRoute>
                        <MatchingPage />
                    </GuardedRoute>
                }
                loader={matchingPageLoader}
                action={matchingPageAction}
            />
            <Route
                path={ROUTES.MATCHES_PAGE.PATH}
                element={
                    <GuardedRoute>
                        <MatchesPage />
                    </GuardedRoute>
                }
                loader={matchesPageLoader}
            />
            <Route
                path={ROUTES.PROFILE_PAGE.PATH}
                element={
                    <GuardedRoute>
                        <ProfilePage />
                    </GuardedRoute>
                }
                loader={profilePageLoader}
            />
            <Route
                path={ROUTES.CREATE_PROFILE_PAGE.PATH}
                element={
                    <GuardedRoute>
                        <CreateProfilePage />
                    </GuardedRoute>
                }
                loader={createProfilePageLoader}
            />
            <Route
                path={ROUTES.REGISTRATION_PAGE.PATH}
                element={
                    <AnonymousRoute>
                        <RegistrationPage />
                    </AnonymousRoute>
                }
                errorElement={<RegistrationPage />}
                action={registrationAction}
            />
            <Route
                path={ROUTES.LOGIN_PAGE.PATH}
                element={
                    <AnonymousRoute>
                        <LoginPage />
                    </AnonymousRoute>
                }
                errorElement={<LoginPage />}
                action={loginAction}
            />
        </Route>
    )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
