import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import Home from '../pages/Home'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes