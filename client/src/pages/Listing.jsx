import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
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

  return (
    <main>
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
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url} className="bg-slate-900">
                <div
                  className="h-[450px] max-w-2xl mx-auto "
                  style={{ background: `url(${url})`, backgroundSize: 'cover'}}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
  //   <main>{listing && listing.name}</main>;
}
