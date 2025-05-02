import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./components/Header";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHeader from "./admin/components/AdminHeader";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminAddUser from "./admin/pages/AdminAddUser";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

const AppContent = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}

      <Routes>
        {/* User routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin routes */}
        {/* <Route
          // path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard 
            </AdminProtectedRoute>
          }
        /> */}



        {/* <Route
          path="/admin/add-user"
          element={
            <AdminProtectedRoute>
              <AdminAddUser />
            </AdminProtectedRoute>
          }
        /> */}

        <Route element={<AdminProtectedRoute/>}>
 
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />    
          <Route path="/admin/add-user" element={ <AdminAddUser />} />    

         </Route>






      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
