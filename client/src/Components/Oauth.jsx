import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import api from '../api';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            //creating google OAuth Provider
            const provider = new GoogleAuthProvider();

            //requesting firebase to with configuration provided by firebase
            const auth = getAuth(app);
            const oauthResult = await signInWithPopup(auth, provider);

            const result = await api.post("/auth/google", {
                name: oauthResult.user.displayName,
                email: oauthResult.user.email,
                photo: oauthResult.user.photoURL
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            dispatch(signInSuccess(result.data));
            navigate("/")
        }
        catch (error) {
            console.log("Error in google signin",error);
        }
    }
    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Continue with Google
        </button>
    )
}

export default Oauth