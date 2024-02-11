// import React, { useState } from 'react'
// import { FaSearch } from 'react-icons/fa'
// import { Link } from 'react-router-dom'

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   return (
//     <header>
//       <div className="flex justify-between items-center max-w-6xl mx-auto p-3 bg-green-200">
//       <h1 className='font-bold text-2xl sm:text-xl flex flex-wrap'>Arena-State</h1>
//       <ul className={`flex gap-5 text-xl font-semibold ${isMenuOpen ? 'hidden' : 'sm:flex'}`}>
//         <Link to={'/'} className=' sm:inline text-bgDark hover:underline'>Home</Link>
//         <Link to={'/about'} className=' sm:inline text-bgDark hover:underline'>About</Link>
//         <Link to={'/sign-in'} className=' sm:inline text-bgDark hover:underline'>Sign In</Link>
//       </ul>
//       <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
//         <input type="text" placeholder='Search...'
//         className='bg-transparent focus:outline-none w-24 sm:w-64'/>
//         <FaSearch className='text-slate-600'/>
//       </form>
      
//       </div>
//     </header>
//   )
// }

import React, { useState } from 'react'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="flex justify-between items-center mx-auto p-3 bg-green-200">
        <h1 className='font-bold text-2xl sm:text-xl flex flex-wrap'>Arena-State</h1>
        <div className="sm:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        <div className={`hidden sm:flex items-center ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <ul className='flex gap-6 sm:text-xl font-semibold'>
            <li><Link to={'/'} className='text-bgDark hover:underline'>Home</Link></li>
            <li><Link to={'/about'} className='text-bgDark hover:underline'>About</Link></li>
            <li><Link to={'/sign-in'} className='text-bgDark hover:underline'>Sign In</Link></li>
          </ul>
          <form className='bg-slate-100 p-3 rounded-lg flex items-center ml-3'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-600'/>
          </form>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="sm:hidden bg-green-200 p-3">
          <li><Link to={'/'} className='text-bgDark block py-2 hover:underline'>Home</Link></li>
          <li><Link to={'/about'} className='text-bgDark block py-2 hover:underline'>About</Link></li>
          <li><Link to={'/sign-in'} className='text-bgDark block py-2 hover:underline'>Sign In</Link></li>
        </ul>
      )}
    </header>
  )
}

