import { redirect } from "react-router-dom"

import AuthService from "../services/auth-service";

import ROUTES from "../consts/routes"

const logoutAction = () => {
    AuthService.logout();

    return redirect(ROUTES.LOGIN_PAGE.PATH);
}

export default logoutAction;