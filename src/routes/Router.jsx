import { createBrowserRouter } from "react-router-dom";
import Appointment from "../components/appointment/Appointment";
import HomePage from "../components/HomePage/HomePage";
import Login from "../components/login and signup/Login";
import SignUp from "../components/login and signup/SignUp";
import ErrorPage from "../components/shared/ErrorPage";
import Main from "../layout/Main";

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
    }

])