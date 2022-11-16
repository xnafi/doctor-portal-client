import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

const Login = () => {

    const [error, setError] = useState('')
    const { signInUser, googleSignIn } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const { register, handleSubmit, resetField } = useForm();

    const handleLogin = (data) => {
        setError('')
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user
                Swal.fire('Login Successfull')
                resetField()
            })
            .catch(er => {
                setError(er.message)
            })
    }

    const handleGoogleLogin = () => {
        setError('')
        googleSignIn(googleProvider)
            .then(result => {
                Swal.fire('Login Successfull')
            })
            .catch(er => {
                setError(er.message)
                console.log(er.message);
            })
    }

    return (
        <div className='h-full w-full flex justify-center items-start'>
            <div className="p-4 space-y-2 rounded-xl dark:bg-gray-900 dark:text-gray-100 shadow-xl lg:my-20 my-10">
                <h1 className="text-2xl font-bold text-center my-2">Login</h1>
                <h1 className="text-sm text-red-600 animate-pulse font-bold text-center my-4">{error}</h1>
                <form onSubmit={handleSubmit(handleLogin)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-400">Email</label>
                        <input type="email" {...register("eamil", { required: true })} placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400">Password</label>
                        <input type="password" {...register("password", { required: true })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                        <div className="flex text-xs dark:text-gray-400">
                            <Link rel="noopener noreferrer" className='text-left'>Forgot Password?</Link>
                        </div>
                    </div>
                    <button type="submit" className="block w-full p-3 bg-accent text-white text-center rounded-xl dark:text-gray-900 dark:bg-violet-400">Login</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleLogin} className="block w-full p-3 btn btn-outline text-accent text-center rounded-xl dark:text-gray-900 dark:bg-violet-400">CONTINUE WITH GOOGLE</button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
                    <Link rel="noopener noreferrer" to='/signup' className="underline dark:text-gray-100 text-primary">Create a new account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login