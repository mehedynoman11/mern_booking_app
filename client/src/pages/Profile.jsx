import React from 'react'
import { useSelector } from "react-redux";

export default function Profile() {

  const { currentUser } = useSelector((state) => state.user);

  return (
<div className="mt-5 flex flex-col items-center mx-2 min-h-screen">
  <h1 className="text-3xl font-bold text-center">Profile</h1>
  <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6 my-6">
    <form className="flex-col sm:flex sm:flex-row gap-4 flex items-center">
      <div className="flex-shrink-0">
        <img
          src={currentUser.avatar}
          alt="Profile Picture"
          className="rounded-full h-24 w-24 object-cover cursor-pointer my-4"
        />
      </div>
      <div className="flex-grow ">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg w-full mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Update
        </button>
      </div>
    </form>
  </div>
</div>


  )
}
