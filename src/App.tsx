import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/login-page/LoginPage.tsx';
import GlobalSpinner from './components/GlobalSpinner.tsx';
import { Toaster } from 'react-hot-toast';
import ProjectDetails from './pages/projectDetails.tsx';
import { useEffect } from 'react';
import { fetchCurrentUser } from './store/slices/authSlicer';
import CreateProject from './pages/CreateProject.tsx';
import ImageUploadProject from './pages/ImageUploadProject.tsx';
import RegisterPage from './pages/register-page/RegisterPage.tsx';
import EmailPage from './pages/email-page/EmailPage.tsx';
import ResetPasswordPage from './pages/reset-password-page/ResetPasswordPage.tsx';
import SendResetPasswordPage from './pages/send-reset-password-page/SendResetPasswordPage.tsx';
import VerifyEmailToken from './pages/verfiy-email-token/VerfiyEmailToken.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import GuestRoute from './components/GuestRoute.tsx';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import CategoryProjects from './pages/CategoryProjects';
import SearchResults from './pages/SearchResults';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyTerms from './pages/PrivacyTerms';
import NotFound from './pages/NotFound';
import Home from './pages/Home.tsx';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProjectReports from './pages/admin/AdminProjectReports';
import AdminCommentReports from './pages/admin/AdminCommentReports';
import AdminReplyReports from './pages/admin/AdminReplyReports';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser() as any);
    }
  }, [dispatch, token]);
  return (
    <>
      <GlobalSpinner />
      <Toaster position="top-right" />
      <Routes>
        {/* Wrapped elements that need a nav + footer */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <Explore />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/:id/projects"
            element={
              <PrivateRoute>
                <CategoryProjects />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchResults />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/privacy&terms"
            element={
              <PrivateRoute>
                <PrivacyTerms />
              </PrivateRoute>
            }
          />
          <Route
            path="/projectDetails/:id"
            element={
              <PrivateRoute>
                <ProjectDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/createProject"
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id/images"
            element={
              <PrivateRoute>
                <ImageUploadProject />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reports/projects" element={<AdminProjectReports />} />
          <Route path="reports/comments" element={<AdminCommentReports />} />
          <Route path="reports/replies" element={<AdminReplyReports />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/email-verification"
          element={
            <GuestRoute>
              <EmailPage />
            </GuestRoute>
          }
        />
        <Route
          path="/send-reset-password"
          element={
            <GuestRoute>
              <SendResetPasswordPage />
            </GuestRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/verify"
          element={
            <GuestRoute>
              <VerifyEmailToken />
            </GuestRoute>
          }
        />
      </Routes>
    </>
  );
}
