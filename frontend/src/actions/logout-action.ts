import { redirect } from "react-router-dom"
import ROUTES from "../consts/routes"

const logoutAction = () => {
    localStorage.removeItem('token');

    return redirect(ROUTES.LOGIN_PAGE.PATH);
}

export default logoutAction;