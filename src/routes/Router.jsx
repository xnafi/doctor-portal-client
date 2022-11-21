import { createBrowserRouter } from "react-router-dom";
import Appointment from "../components/appointment/Appointment";
import AddDoctor from "../components/dashboard/AddDoctor";
import AllUsers from "../components/dashboard/AllUsers";
import ManageDoctors from "../components/dashboard/ManageDoctors";
import MyAppointment from "../components/dashboard/MyAppointment";
import Payment from "../components/dashboard/Payment";
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
                element: <AdminRoutes><AllUsers /></AdminRoutes>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoutes><AddDoctor /></AdminRoutes>
            },
            {
                path: '/dashboard/managedoctor',
                element: <AdminRoutes><ManageDoctors /></AdminRoutes>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`https://doctor-portal-server-ivory.vercel.app/bookings/${params.id}`),
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
        ]
    }


])