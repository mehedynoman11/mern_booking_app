import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";
import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';



export default function Profile() {

  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(file);
  // console.log(filePerc);
  // console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  },[file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // console.log('Upload is ' + progress + '% done');
      setFilePerc(Math.round(progress))
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      );
    }
  );
};

  return (
<div className="mt-5 flex flex-col items-center mx-2 min-h-screen">
  <h1 className="text-3xl font-bold text-center">Profile</h1>
  <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6 my-6">
    <form className="flex-col sm:flex sm:flex-row gap-4 flex items-center">
      <div className="flex-shrink-0">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img
        onClick={()=> fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile Picture"
          className="rounded-full h-24 w-24 object-cover cursor-pointer my-4"
        />
      </div>
      {/* <p>{fileUploadError ? 
    <span className='text-white bg-blue-500'>Error image upload</span>  ? filePerc > 0 && filePerc < 100 ? () 
    }</p> */}
    <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
      <div className="flex-grow ">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg w-full mb-4 bg-green-100"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg w-full mb-4 bg-green-100"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg w-full mb-4 bg-green-100"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Update
        </button>
      </div>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-white font-semibold cursor-pointer bg-rose-500 p-2 rounded-xl'>Delete Account</span>
      <span className='text-white font-semibold cursor-pointer bg-rose-500 p-2 rounded-xl'>Sign out</span>
    </div>
  </div>
</div>


  )
}
