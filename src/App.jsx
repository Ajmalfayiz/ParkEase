import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import HomePage from './Components/pages/Homepage'
import ParkEaseLogin from './Components/loginPage'
import Signup from './Components/SignupPage'
import ParkingLotDetails from './Components/pages/ListingPage'
import ParkingLotDetailsPage from './Components/pages/Details'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<ParkEaseLogin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/listing' element={<ParkingLotDetails />} />
          <Route path='/details' element={<ParkingLotDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
