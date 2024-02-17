import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <div className=" flex gap-6 flex-wrap">
            <div
              className="flex gap-2
            "
            >
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div
              className="flex gap-2
            "
            >
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>{" "}
            <div
              className="flex gap-2
            "
            >
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>{" "}
            <div
              className="flex gap-2
            "
            >
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div
              className="flex gap-2
            "
            >
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discount price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ml-4">
            Image:{" "}
            <span className=" font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full "
            />
            <button
              className="p-2 bg-blue-500 rounded-lg text-white border uppercase font-bold hover:shadow-xl"
              type="submit"
            >
              Upload
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 font-bold rounded-lg"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
