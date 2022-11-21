import { useContext, useEffect, useState } from "react"




const useToken = (user) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (user?.email) {
            fetch(`https://doctor-portal-server-ivory.vercel.app/jwt?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.accessToken) {
                        localStorage.setItem('token', data.accessToken)
                        setToken(data.accessToken)
                    }
                })
        }
    }, [user?.email])
    return [token]

}

export default useToken