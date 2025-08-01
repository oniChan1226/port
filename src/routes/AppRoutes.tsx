import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { lazy } from "react";
import LazyWrapper from "./LazyWrapper";

const Home = lazy(() => import("../pages/Home"));
const Experience = lazy(() => import("../pages/Experience"));
const Stack = lazy(() => import("../pages/Stack"));
const About = lazy(() => import("../pages/About"));
const Projects = lazy(() => import("../pages/Projects"));
const Articles = lazy(() => import("../pages/Articles"));
const Services = lazy(() => import("../pages/Services"));
const Feed = lazy(() => import("../pages/Feed"));
const GuestBook = lazy(() => import("../pages/GuestBook"));
const Contact = lazy(() => import("../pages/Contact"));
const ArticleDetails = lazy(() => import("../pages/ArticleDetails"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<LazyWrapper Component={Home} />} />
        <Route path="services" element={<LazyWrapper Component={Services} />} />
        <Route
          path="experience"
          element={<LazyWrapper Component={Experience} />}
        />
        <Route path="projects" element={<LazyWrapper Component={Projects} />} />
        <Route path="projects/:slug" element={<LazyWrapper Component={ProjectDetails} />} />
        <Route path="about" element={<LazyWrapper Component={About} />} />
        <Route path="stack" element={<LazyWrapper Component={Stack} />} />
        <Route path="articles" element={<LazyWrapper Component={Articles} />} />
        <Route
          path="articles/:id"
          element={<LazyWrapper Component={ArticleDetails} />}
        />
        <Route path="feed" element={<LazyWrapper Component={Feed} />} />
        <Route
          path="guest-book"
          element={<LazyWrapper Component={GuestBook} />}
        />
        <Route path="contact" element={<LazyWrapper Component={Contact} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
