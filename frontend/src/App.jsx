import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './Components/Layout'
import HomePage from './pages/Homepage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/SignupPage'
import ListingPage from './pages/ListingPage'
import DetailsPage from './pages/Details'
import AdminDashboard from './pages/AdminDashboard'

const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth)

  if (!user && !token) {
    return <Navigate to='/login' replace />
  }

  return children
}

const PublicOnlyRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth)

  if (user || token) {
    return <Navigate to='/' replace />
  }

  return children
}

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/login' element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
          <Route path='/signup' element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
          <Route path='/listing' element={<ProtectedRoute><ListingPage /></ProtectedRoute>} />
          <Route path='/details/:lotId?' element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
