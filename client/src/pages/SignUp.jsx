import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Create a new account</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button type='submit' className='bg-indigo-500 p-3 hover:opacity-80 text-white text-xl'>Sign up</button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Have an account?</p>
        <Link className='text-[blue]' to={'/sign-in'}>Sign in</Link>
      </div>
    </div>
  )
}
