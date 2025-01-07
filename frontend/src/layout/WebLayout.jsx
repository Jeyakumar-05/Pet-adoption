import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const WebLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default WebLayout