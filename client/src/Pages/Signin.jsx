import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import api from '../api';
import { toast } from 'react-toastify';
import Oauth from '../Components/Oauth';

const Signin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await api.post("/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res, "res");
      toast.success(res.data);
      dispatch(signInSuccess(res.data))

    }
    catch (error) {
      toast.error(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
      console.log("Error in signup", error);
      // setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg focus:outline-none'
          id='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg focus:outline-none'
          id='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>
          Dont have an account?
        </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default Signin