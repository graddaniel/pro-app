import { redirect } from "react-router-dom";

import ROUTES from "../consts/routes";

const authorizationLoader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return redirect(ROUTES.LOGIN_PAGE.PATH);
    }

    return null;
};

export default authorizationLoader;