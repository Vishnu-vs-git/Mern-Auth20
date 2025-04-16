import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser}=useSelector(state=> state.user)
  console.log("current user is",currentUser)
  return (
    <div  className="p-3 max-w-lg mx-auto"   >
      <h1 className= "text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" >
        <img className="w-23 h-23 rounded-full  object-cover mt-2 cursor-pointer  self-center " src={currentUser.profilePicture} alt="Profile-image"/>
        <input defaultValue={currentUser.username}  type="text" id='username' placeholder='username' className='bg-slate-100 rounded-lg p-3 '/>
        <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3 '/>
        <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3 '/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80 " >Update</button>
      </form>
      <div className='flex justify-between mt-5'  >
        <span className="text-red-700 cursor-pointer"> Delete Account</span>
        <span className="text-red-700 cursor-pointer"> Sign out</span>
      </div>
    </div>
  )
}

export default Profile