import { createBrowserRouter } from "react-router-dom";
import Appointment from "../components/appointment/Appointment";
import AllUsers from "../components/dashboard/AllUsers";
import MyAppointment from "../components/dashboard/MyAppointment";
import HomePage from "../components/HomePage/HomePage";
import Login from "../components/login and signup/Login";
import SignUp from "../components/login and signup/SignUp";
import ErrorPage from "../components/shared/ErrorPage";
import DashBoard from "../layout/DashBoard";
import Main from "../layout/Main";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/appoinment',
                element: <Appointment />
            }
            ,
            {
                path: '/login',
                element: <Login />
            }
            ,
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment />
            },
            {
                path: '/dashboard/users',
                element:<AdminRoutes><AllUsers /></AdminRoutes> 
            },
        ]
    }


])