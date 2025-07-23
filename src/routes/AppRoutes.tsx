import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import("../pages/Home"))
const Experience = lazy(() => import("../pages/Experience"))
const Stack = lazy(() => import("../pages/Stack"))
const About = lazy(() => import("../pages/About"))
const Projects = lazy(() => import("../pages/Projects"))
const Articles = lazy(() => import("../pages/Articles"))

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
          <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path='/experience' element={<Experience />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/about' element={<About />} />
              <Route path='/stack' element={<Stack />} />
              <Route path='/articles' element={<Articles />} />
          </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes