import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/Forget_Password";
import SignUp from "../Pages/SignUp";


const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'Login',
                element:<Login/>
            },
            {
                path:'forget-password',
                element:<ForgetPassword/>
            },
            {
                path:'Sign-up',
                element:<SignUp/>
            }
        ]
    }
])

export default router;