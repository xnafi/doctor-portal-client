import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider'

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire('Logout successful')
            })
    }
    const menuItem =
        <>
            <li className='hover:underline underline-offset-4 font-semibold'><Link to='/'>Home</Link></li>
            <li className='hover:underline underline-offset-4 font-semibold'><Link to='/about'>About</Link></li>
            <li className='hover:underline underline-offset-4 font-semibold'><Link to='/appoinment'>Appoinment</Link></li>
            {

                user && user.uid ? <>
                    <li className='hover:underline underline-offset-4 font-semibold'><Link to='/dashboard'>Dashboard</Link></li> 
                    <li className='hover:underline underline-offset-4 font-semibold' onClick={handleLogOut}><Link to='/'>Logout</Link></li></> :
                    <>
                        <li className='hover:underline underline-offset-4 font-semibold'><Link to='/login'>Login</Link></li>
                        <li className='hover:underline underline-offset-4 font-semibold'><Link to='/signup'>Sign up</Link></li>
                    </>
            }
        </>
    return (
        <div className="navbar flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 w-52">
                        {
                            menuItem
                        }
                    </ul>
                </div>
                <Link to='/'> <h1 className='md:text-xl text-sm text-black font-extrabold'>DOCTORS PORTAL</h1> </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        menuItem
                    }
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    )
}

export default NavBar