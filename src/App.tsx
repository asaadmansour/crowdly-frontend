import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectDetails from './pages/projectDetails';
export default function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/projectDetails/:id" Component={ProjectDetails}></Route>
    </Routes>
  );
}
