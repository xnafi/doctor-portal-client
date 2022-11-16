import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { app } from '../firebase/firebase.init'

export const AuthContext = createContext()

const auth = getAuth(app)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateInfo = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        })
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const googleSignIn = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, curentUser => {
            setUser(curentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const values = {
        createUser,
        signInUser,
        loading,
        logOut,
        user,
        updateInfo,
        googleSignIn

    }

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider