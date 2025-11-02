import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api';
import { toast } from 'react-toastify';
import Oauth from '../Components/Oauth';

const Signup = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/auth/signup", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(res.data);
            setLoading(false)
        }
        catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in signup", error);
            setLoading(false);
        }
        finally {
            setLoading(false);
            navigate("/sign-in")
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>
                Sign Up
            </h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='username'
                    className='border p-3 rounded-lg focus:outline-none'
                    id='username'
                    value={formData.username}
                    onChange={handleChange}

                />
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
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                <Oauth/>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>
                    Have an account?
                </p>
                <Link to={'/sign-in'}>
                    <span className='text-blue-700'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}

export default Signup