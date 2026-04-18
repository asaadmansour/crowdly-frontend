import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Categories from "./pages/Categories";
import CategoryProjects from "./pages/CategoryProjects";
import SearchResults from "./pages/SearchResults";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyTerms from "./pages/PrivacyTerms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
      <Routes>
        {/* Wrapped elements that need a nav + footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id/projects" element={<CategoryProjects />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy&terms" element={<PrivacyTerms/>}/>
        </Route>
        
        <Route path="*" element={<NotFound />} />
        {/* Element that won't need a nav + footer */}

        {/* The one working on this please add the following pages:
        Login, Sign-up, Forgot Password, etc.. */}
      </Routes>
  )
}