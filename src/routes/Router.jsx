import { createBrowserRouter } from "react-router-dom";
import Appointment from "../components/appointment/Appointment";
import HomePage from "../components/HomePage/HomePage";
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
        ]
    }

])