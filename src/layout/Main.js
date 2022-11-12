import React from 'react'
import NavBar from '../components/shared/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/shared/Footer'

const Main = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Main