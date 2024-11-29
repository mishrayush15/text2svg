import React, { useEffect } from 'react'
import { useFirebase } from '../Context/Firebase'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();
    
    
    

    // -- Google Authentication --
    const LoginByGoogle = async () => {
        try {
            const loginResponse = await firebase.GoogleLogIn();
            navigate('/home')
        } catch (error) {
            navigate('/login/google')
        }
    }

    

    // -- Validator --
    useEffect(() => {
        if (firebase.isLoggedin) navigate('/home')
    }, [firebase.isLoggedin, navigate])


    return (
        <div className='w-screen h-screen bg-slate-700 flex flex-col sm:justify-center items-center sm:space-y-7 space-y-7'>
            <img onClick={LoginByGoogle} className='sm:mt-0 mt-72 hover:shadow-xl cursor-pointer' src="/google.svg" alt="google-button" />
        </div>
    )
}

export default Login
