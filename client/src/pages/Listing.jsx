import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaParking, FaShare } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const [contact, setContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  //   console.log(loading);
//   console.log(currentUser);
  return (
    <main className="">
      {loading && (
        <p className="text-center my-7 text-2xl font-bold">Loading...</p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl font-bold">
          Something went wrong
        </p>
      )}
      {listing && !loading && !error && (
        <>
          {/* <h1>{listing.name}</h1> */}
          {/* <Swiper navigation>
                {listing.imageUrls.map(url >
                    <SwiperSlide key={url}>
                        <div className="h-[550px" style={{background: `url(${url}) bg-center bg-no-repeat`}}>

                        </div>
                    </SwiperSlide>
                )}
            </Swiper> */}
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url} className="bg-slate-900">
                  <div
                    className="h-[450px] max-w-2xl mx-auto "
                    style={{
                      background: `url(${url})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* <div className="">
                <p className="bg-pink-800 font-semibold w-full 
                max-w-[200px] text-white text-center p-1 rounded-md">
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {
                    listing.offer && (
                        <p  className="bg-emerald-700 font-semibold w-full 
                        max-w-[200px] text-white text-center p-1 rounded-md">${+listing.regularPrice - +listing.discountPrice}</p>
                    )
                }
          </div> */}
          <div
            className="fixed top-[13%] right-[3%] z-10 border 
           rounded-full w-12 h-12 flex justify-center items-center 
           bg-slate-100 cursor-pointer"
          >
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-4 gap-4">
            <p className="text-3xl font-bold text-slate-800 font-poppins">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-3 gap-2 text-slate-700 font-medium text-sm">
              <FaMapMarkerAlt className="text-slate-900" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-slate-800 border-2 shadow-xl w-full max-w-[200px] text-white font-bold text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-white border-2 shadow-xl border-slate-800 w-full max-w-[200px] font-bold text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p>
              <span className="text-slate-900 font-semibold">
                Description -{" "}
              </span>
              {listing.description}
            </p>
            <ul className="flex flex-wrap gap-5 items-center sm:gap-6 text-slate-900 font-bold text-xl">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-xl" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-xl" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-xl" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-xl" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&  !contact && (
              <button
                onClick={() => setContact(true)} 
                className="bg-slate-800 text-white p-1 border-2 shadow-xl font-bold rounded-lg
                uppercase hover:bg-slate-600">
                    Contact LandOwner
                </button>
                )}
                {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
  //   <main>{listing && listing.name}</main>;
}
