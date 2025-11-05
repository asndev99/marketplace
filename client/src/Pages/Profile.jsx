import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(currentUser.avatar);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    if (file) data.append("profileImage", file);
    if (formData.username !== currentUser.username)
      data.append("username", formData.username);
    if (formData.password.trim() !== "")
      data.append("password", formData.password);

    try {
      dispatch(updateUserStart());
      console.log(data, "data");
      const result = await api.post(`user/update`, data);
      dispatch(updateUserSuccess(result.data));
      toast.success("Profile Updated Successfully");

      // const json = await res.json();
      // console.log(json);
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
      console.log("Error in updating user", error);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const result = await api.post("auth/signout");
      dispatch(signOutSuccess());
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log(error, "Error in signout");
      dispatch(signOutFailure())
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            if (selectedFile) {
              setFilePreview(URL.createObjectURL(selectedFile));
            }
          }}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={filePreview}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer 
        self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg focus:outline-none"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
          value={currentUser.email}
          disabled
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="cursor-pointer bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Update"}
        </button>
        {error && <span className="text-red-700 text-center">{error}</span>}
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
