import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ConfirmationModal from '../login and signup/ConfirmationModal';
import Loading from '../shared/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctorsData = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/doctors`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })


    const handleDelete = (id) => {
        fetch(`http://localhost:5000/doctors/${id._id}`, {
            method: 'delete',
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire(`Doctordeleted successfully`)
                }
            })

    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">All doctors</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3"></th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Speciality</th>
                            <th className="p-3 ">Admin action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctorsData.map((user, index) =>
                                <tr key={user._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                    <td className="p-3">
                                        <p>{index + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={user.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.email}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.speciality}</p>
                                    </td>
                                    <td className="p-3 ">
                                        <label onClick={() => setDeletingDoctor(user)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                    </td>


                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    )
}

export default ManageDoctors