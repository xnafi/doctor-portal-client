import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Swal from 'sweetalert2'

const AllUsers = () => {

  const { data: loadUser = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://doctor-portal-server-ivory.vercel.app/users')
      const data = await res.json()
      return data
    }
  })

  const handleDeleteUser = (id) => {
    fetch(`https://doctor-portal-server-ivory.vercel.app/users/${id}`, {
      method: 'delete',
      headers: {
        authorization: `bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          Swal.fire('Successfully deleted')
          refetch()
        }
      })
    console.log(id);
  }


  const makeAdmin = (id) => {

    fetch(`https://doctor-portal-server-ivory.vercel.app/users/admin/${id}`, {
      method: 'put',
      headers: {
        authorization: `bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // setAdmin(data)
        if (data.modifiedCount) {
          Swal.fire('set as admin')
          refetch()
        }
      })

  }

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">All users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-3"></th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 ">Admin action</th>
            </tr>
          </thead>
          <tbody>
            {
              loadUser.map((user, index) =>
                <tr key={user._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                  <td className="p-3">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-3">
                    <p>{user.name}</p>
                  </td>
                  <td className="p-3">
                    <p>{user.email}</p>
                  </td>
                  <td className="p-3">
                    {
                      user?.role === 'admin' ? <p>{user.role}</p> : <p><button onClick={() => makeAdmin(user._id)} className='btn btn-sm'>make admin</button></p>
                    }

                  </td>
                  <td className="p-3 ">
                    <p><button onClick={() => handleDeleteUser(user._id)} className='btn btn-sm'>Delete</button></p>
                  </td>

                </tr>
              )
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default AllUsers