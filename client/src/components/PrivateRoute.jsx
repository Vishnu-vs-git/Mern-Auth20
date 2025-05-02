import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
  const {currentUser} = useSelector(state=>state.user)
  const{currentAdmin}=useSelector(state=>state.admin)

  if(!currentAdmin&&currentUser){
    return <Outlet/>

  }else{
    return <Navigate to="/sign-in" />

  }
}
