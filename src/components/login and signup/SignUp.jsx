import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider'
import useToken from '../../hooks/useToken'


const SignUp = () => {

    const [error, setError] = useState('')
    const { createUser, updateInfo, googleSignIn } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const { register, handleSubmit, reset } = useForm();
    const location = useLocation()
    const navigate = useNavigate()
    const form = location.state?.from?.pathname || '/'
    const [newUser, setNewUser] = useState(null)
    const [token] = useToken(newUser)

    if (token) {
        navigate(form, { replace: true })
    }

    const handleSignIn = (data) => {
        setError('')
        createUser(data.email, data.password)
            .then(result => {
                insertUser(data.name, data.email)
                updateInfo(data.name, data.photoUrl)
                    .then(() => {
                        setNewUser(data.email)
                    })
                    .catch(er => setError(er))
                Swal.fire('Account Create Successfull')
                reset()

            })
            .catch(er => {
                setError(er.message)
            })
    }

    const handleGoogleLogin = () => {
        googleSignIn(googleProvider)
            .then(result => {
                Swal.fire('Login Successfull')
                setError('')
                const name = result.user.name ? result.user.name : 'New user'
                insertUser(name, result?.user?.email)
                navigate(form, { replace: true })
                reset()

            })
            .catch(er => {
                setError(er.message)
                console.log(er.message);
            })
    }


    const insertUser = (name, email) => {
        const user = { name, email }
        fetch('https://doctor-portal-server-ivory.vercel.app/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setNewUser(email)
            })

    }




    return (
        <div className='h-full w-full flex justify-center items-start px-2'>
            <div className="p-4 space-y-2 rounded-xl dark:bg-gray-900 dark:text-gray-100 shadow-xl lg:my-20 my-10 w-full h-full md:w-1/3 md:p-6">
                <h1 className="text-2xl font-bold text-center my-2">Sign Up</h1>
                <h1 className="text-sm text-red-600 animate-pulse font-bold text-center my-4">{error}</h1>
                <form onSubmit={handleSubmit(handleSignIn)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-400">Name</label>
                        <input type="text" {...register("name", { required: true })} placeholder="Name" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-400">User Image</label>
                        <input type="text" {...register("photoUrl", { required: true })} placeholder="Photo url" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-400">Email</label>
                        <input type="email" {...register("email", { required: true })} placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400">Password</label>
                        <input type="password" {...register("password", { required: true })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                        <div className="flex text-xs dark:text-gray-400">
                            <Link rel="noopener noreferrer" className='text-left'>Forgot Password?</Link>
                        </div>
                    </div>
                    <button type="submit" className="block w-full p-3 bg-accent text-white text-center rounded-xl dark:text-gray-900 dark:bg-violet-400">Sign up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    <p className="px-3 text-sm dark:text-gray-400">Sign in with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleLogin} className="block w-full p-3 btn btn-outline text-accent text-center rounded-xl dark:text-gray-900 dark:bg-violet-400">CONTINUE WITH GOOGLE</button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-400">Have an account?
                    <Link rel="noopener noreferrer" to='/login' className="underline dark:text-gray-100 text-primary">Login account</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp