import React  from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

const AdminProtectedRoute = () => {
 
  const currentAdmin= useSelector((state)=>state.admin.currentAdmin)
    if(currentAdmin){
      return <Outlet/>
    }else{
      return <Navigate to={"/admin/login"}/>
    }
       
};

export default AdminProtectedRoute;
