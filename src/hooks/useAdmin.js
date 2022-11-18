// import { useEffect, useState } from "react"

// const useAdmin = (email) => {
//     const [isAdmin, setIsAdmin] = useState(false)
//     // const [isloading, setIsLoading] = useState(false)
//     useEffect(() => {
//         if (email) {
//             fetch(`http://localhost:5000/users/admin/${email}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     console.log(data)
//                     setIsAdmin(data.isAdmin)
//                     // setIsLoading(true)
//                 })
//         }
//     }, [email])
//     return [isAdmin]
// }

// export default useAdmin
import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;