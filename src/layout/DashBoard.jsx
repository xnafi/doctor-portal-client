import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from '../components/shared/NavBar'
import { AuthContext } from '../contexts/AuthProvider'
import useAdmin from '../hooks/useAdmin'

const DashBoard = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user.email)
    return (

        <>
            <NavBar />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-8">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to="/dashboard">My Appointments</Link></li>
                        {/* <li><Link to="/dashboard/users">All users</Link></li> */}

                        {
                            isAdmin && <>
                                <li><Link to="/dashboard/users">All users</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </>
    )
}

export default DashBoard