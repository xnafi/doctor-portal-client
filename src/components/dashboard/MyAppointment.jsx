import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'

const MyAppointment = () => {
    const { user } = useContext(AuthContext)
    const { data: MyAppointments = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">My Appointments</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3"></th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Treatment</th>
                            <th className="p-3">Appointment Date</th>
                            <th className="p-3 ">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            MyAppointments &&
                            MyAppointments?.map((appointment, index) =>
                                <tr key={appointment._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                    <td className="p-3">
                                        <p>{index + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{appointment.patient}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{appointment.treatment}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{appointment.appointmentDate}</p>

                                    </td>
                                    <td className="p-3 ">
                                        <p>{appointment.slot}</p>
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

export default MyAppointment