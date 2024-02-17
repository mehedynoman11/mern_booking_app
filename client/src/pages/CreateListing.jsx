import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imagUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);

  console.log(formData);
  const handleImageSubmit = async (e) => {
    // e.preventDefault
    if (files.length > 0 && files.length + formData.imagUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false)

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imagUrls: formData.imagUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          setUploading(false)
        });
    } else {
      setImageUploadError("You can only upload 6 images.");
      setUploading(false)
    }
  };
  // console.log(files);
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${Math.round(progress)}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imagUrls: formData.imagUrls.filter((_, i) => i !== index),
    })
  }
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
            Image:
            <span className=" font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border-2 border-slate-900 rounded w-full "
            />
            <button
              onClick={handleImageSubmit}
              className="p-2 bg-blue-500 rounded-lg text-white border uppercase font-bold hover:shadow-xl"
              type="button"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p>{imageUploadError && imageUploadError}</p>
          {/* {
            formData.imagUrls.length > 0 && formData.imagUrls.map((urls) => {
              <div className="">
                <img src={urls} 
                alt="Listing image"
                className="w-20 h-20 object-center rounded-lg" />
                <button>Delete</button>
              </div>
            })
          } */}
          {formData.imagUrls.length > 0 &&
            formData.imagUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border-2 border-slate-900 items-center"
              >
                <img
                  src={url}
                  alt="Listing image"
                  className="w-20 h-20 object-center rounded-lg"
                />
                <button 
                type="button"
                className="p-3 rounded-lg text-red-600 font-bold" 
                onClick={() => handleRemoveImage(index)}>
                  Delete
                </button>
              </div>
            ))}

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
