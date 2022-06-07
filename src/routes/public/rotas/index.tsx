import Login from "../../../pages/login";
import SignUp from "../../../pages/signup";

/** @type { import("react-router-dom").RouteProps[] } */
export const ROTAS_PUBLICAS = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/signup',
        component: SignUp
    }
]