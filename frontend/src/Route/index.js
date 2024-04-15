import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/Forget_Password";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUser from "../Pages/AllUser";
import Products from "../Pages/Products";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'Login',
                element: <Login />
            },
            {
                path: 'forget-password',
                element: <ForgetPassword />
            },
            {
                path: 'Sign-up',
                element: <SignUp />
            },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'all-users',
                        element: <AllUser />,
                    },
                    {
                        path: 'products',
                        element: <Products />
                    }
                ]
            }
        ]
    }
])

export default router;