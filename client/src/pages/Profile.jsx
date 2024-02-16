import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // console.log(file);
  // console.log(filePerc);
  // console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setFilePerc(Math.round(progress));
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure)(error.message);
    }
  };
  return (
    <div className="mt-5 flex flex-col items-center mx-2 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Profile</h1>
      <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6 my-6">
        <form
          onSubmit={handleSubmit}
          className="flex-col sm:flex sm:flex-row gap-4 flex items-center"
        >
          <div className="flex-shrink-0">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="Profile Picture"
              className="rounded-full h-24 w-24 object-cover cursor-pointer my-4"
            />
          </div>
          {/* <p>{fileUploadError ? 
    <span className='text-white bg-blue-500'>Error image upload</span>  ? filePerc > 0 && filePerc < 100 ? () 
    }</p> */}
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="flex-grow ">
            <input
              type="text"
              placeholder="Username"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full mb-4 bg-green-100"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full mb-4 bg-green-100"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full mb-4 bg-green-100"
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-white font-semibold cursor-pointer bg-rose-500 p-2 rounded-xl"
          >
            Delete Account
          </span>
          <span className="text-white font-semibold cursor-pointer bg-rose-500 p-2 rounded-xl">
            Sign out
          </span>
        </div>
      </div>
      {/* <p className='text-bgRed font-bold p-2 '>{error ? error : ''}</p>
  <p className='text-teal-800 font-bold p-2 '>{updateSuccess ? 'user updated successfully' : ''}</p> */}
      <div>
        {error && <p className="text-bgRed font-bold p-2 ">{error}</p>}
        {updateSuccess && (
          <p className="text-teal-800 font-bold p-2 ">
            User updated successfully
          </p>
        )}
      </div>
    </div>
  );
}
