import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
  const {currentUser} = useSelector(state=>state.user)
  const{currentAdmin}=useSelector(state=>state.admin)
  // return currentUser?<Outlet/>:<Navigate to ='/sign-in'/>
  if(!currentAdmin&&currentUser){
    return <Outlet/>

  }else{
    Navigate("/sign-in")
  }
}
