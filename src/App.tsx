import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/login-page/LoginPage.tsx';
import HomePage from './pages/home-page/HomePage.tsx';
import GlobalSpinner from './components/GlobalSpinner.tsx';
import { Toaster } from 'react-hot-toast';
import ProjectDetails from './pages/projectDetails.tsx';
import { useEffect } from 'react';
import { fetchCurrentUser } from './store/slices/authSlicer';
import CreateProject from './pages/CreateProject.tsx';
import ImageUploadProject from './pages/ImageUploadProject.tsx';

export default function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
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
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route path="/projectDetails/:id" Component={ProjectDetails}></Route>
        <Route path="/createProject" Component={CreateProject}></Route>
        <Route path="/projects/:id/images" Component={ImageUploadProject}></Route>
      </Routes>
    </>
  );
}
