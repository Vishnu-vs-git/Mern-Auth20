import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';






const Home = () => {
  const navigate=useNavigate()
  const currentUser= useSelector((state)=>{
    return state.user.currentUser
  })

  useEffect(()=>{
  if(currentUser==null){
      navigate("/sign-up")
  }else{
    navigate("/home")
  }


  }, [currentUser, navigate])
  


  return (
    <div className="flex items-center justify-center h-screen bg-[#000000]">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Welcome to User Auth
      </h1>


    </div>
  );
};

export default Home;
