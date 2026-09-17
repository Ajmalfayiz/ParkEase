import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import HomePage from './pages/Homepage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/SignupPage'
import ListingPage from './pages/ListingPage'
import DetailsPage from './pages/Details'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/listing' element={<ListingPage />} />
          <Route path='/details/:lotId?' element={<DetailsPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
