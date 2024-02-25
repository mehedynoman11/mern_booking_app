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
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import ListingItem from '../components/ListingItem'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation])
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, [])
  return (
    <div>
      
      <div>
  {/* Swiper */}
  <Swiper navigation>
    {rentListings && rentListings.length > 0 && rentListings.map((listing) => (
      <SwiperSlide key={listing._id}>
        <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover', height: '450px', maxWidth: '6xl', margin: 'auto' }}></div>
      </SwiperSlide>
    ))}
  </Swiper>
  
  {/* Text */}
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '10', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px', padding: '10px'}}>
  <h1 className='text-white font-bold text-3xl lg:text-5xl my-4'>Find Your next place to stay</h1>
  <Link className='text-[#b3ff8a] font-medium font-poppins text-xl hover:underline lg:text-2xl mt-4' to={'/search'}>
    Let's get started
  </Link>
</div>
</div>

      {/* top */}
      {/* <div className="absolute top-32 right-48 z-10 p-10 px-3 mx-auto">
        <h1 className='text-slate-800 font-bold text-3xl lg:text-5xl'
        >Find Your next place to stay</h1>
        <Link className='text-blue-800 font-bold text-xs lg:text-xl' to={'/search'}>
          Let's get start
        </Link>
      </div> */}
      {/* listing */}
              <div className='max-w-6xl mx-auto p-6 flex flex-col gap-6 my-10'>
              {offerListings && offerListings.length > 0 && (
                <div className="">
                  <div className="my-3">
                    <h2 className='text-xl text-slate-800 font-bold'>Recent Offer</h2>
                    <Link className='font-medium' to={'/search?offer=true'}>
                      Show More Listings
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-5 items-center justify-start">
                    {offerListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))}
                  </div>
                </div>
              )}
              {rentListings && rentListings.length > 0 && (
                <div className="">
                  <div className="my-3">
                    <h2 className='text-xl text-slate-800 font-bold'>Recent Rent</h2>
                    <Link className='font-medium' to={'/search?type=rent'}>
                      Show More Listings
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-5 items-center justify-start">
                    {rentListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))}
                  </div>
                </div>
              )}
              {saleListings && saleListings.length > 0 && (
                <div className="">
                  <div className="my-3">
                    <h2 className='text-xl text-slate-800 font-bold'>Recent Sale</h2>
                    <Link className='font-medium' to={'/search?type=sale'}>
                      Show More Listings
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-5 items-center justify-start">
                    {saleListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))}
                  </div>
                </div>
              )}
              </div>

    </div>
  )
}
