import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './Components/Header'
import ParkEaseLogin from './Components/loginPage'
import Signup from './Components/SignupPage'
import ParkingLotDetails from './Components/pages/ListingPage'
import ParkingLotDetailsPage from './Components/pages/Details'


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<ParkEaseLogin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/listing' element={<ParkingLotDetails />} />
                <Route path='/details' element={<ParkingLotDetailsPage />} />

            </Routes>
        </>
    )
}

export default AppRoutes