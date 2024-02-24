// import React, { useState, useEffect } from 'react'
// import { FaSearch } from 'react-icons/fa'

// export default function Home() {

//   const [searchTerm, setSearchTerm] = useState('')

//   const handleSubmit =(e) => {
//     e.preventDefault()
//     const urlParams = new URLSearchParams(window.location.search)
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   }

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl)
//     }
//   }, [location.search])
//   return (
//     <div className='flex'>
//       <div className="border-b max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-center">
//         <img src="https://www.slidebackground.com/uploads/real-estate-background/real-estate-background-powerpoint-backgrounds-4.jpg" alt="Bak" />
//         <div className='hidden sm:absolute  sm:flex sm:justify-center sm:items-center'>
//         <form 
//           onSubmit={handleSubmit}
//           className="bg-slate-100 p-3 rounded-lg 
//           flex items-center ml-3">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent focus:outline-none w-24 sm:w-64 p-2"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="text-slate-600" />
//             <button></button>
//           </form>
//         </div>
//       </div>
//       <div className="flex-1">

//       </div>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch('/api/setRentListings')
      } catch (error) {
        
      }
    }
  })
  return (
    <div>
      {/* top */}
    <div className="flex flex-col gap-5 p-28 px-3 max-w-6xl mx-auto">
      <h1 className='text-slate-800 font-bold text-3xl lg:text-5xl'
      >Find Your next place to stay</h1>
      <Link className='text-blue-800 font-bold text-xs lg:text-xl' to={'/search'}>
        Let's get start
      </Link>
    </div>
      {/* swipper */}

      {/* listing */}


    </div>
  )
}
