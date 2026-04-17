import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyTerms from "./pages/PrivacyTerms";
import NotFound from "./pages/NotFound";
import SuspenseSpinner from "./components/SuspenseSpinner";

export default function App() {
  return (
    <Suspense fallback={<SuspenseSpinner />}>
      <Routes>
        {/* Wrapped elements that need a nav + footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy&terms" element={<PrivacyTerms />} />
        </Route>

        {/* Standalone pages without nav + footer */}
        <Route path="/404" element={<NotFound />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Element that won't need a nav + footer */}
        {/* Login, Sign-up, Forgot Password, etc.. */}
      </Routes>
    </Suspense>
  );
}
