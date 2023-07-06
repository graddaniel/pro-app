import React from 'react';
import {
    useLoaderData,
    useNavigate
} from 'react-router-dom';

import ROUTES from '../consts/routes';

const ProfilePage = () => {
    const profile = useLoaderData();
    const navigate = useNavigate();


    if (!profile) {
        navigate(ROUTES.CREATE_PROFILE_PAGE.PATH);
        return null;
    }

    return (
        <article>
            Profile
        </article>
    );
};

export default ProfilePage;