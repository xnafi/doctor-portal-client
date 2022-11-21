import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const AddDoctor = () => {

  const { register, handleSubmit, error } = useForm();
  const navigate = useNavigate()

  const { data: specialities = [] } = useQuery({
    queryKey: ['specialty'],
    queryFn: async () => {
      const res = await fetch('https://doctor-portal-server-ivory.vercel.app/doctors/speciality')
      const data = await res.json()
      return data
    }
  })


  const handleAdd = (data) => {
    const image = data.image[0]
    const formData = new FormData();
    formData.append('image', image)

    fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`, {
      method: 'post',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            speciality: data.speciality,
            image: result.data.url
          }
          fetch('https://doctor-portal-server-ivory.vercel.app/doctors', {
            method: 'post',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify(doctor)
          })
            .then(res => res.json())
            .then(result => {
              if (result.acknowledged) {
                navigate('/dashboard/managedoctor')
                Swal.fire(`doctor added successfully`)
              }

            })
        }
      })
  }
  return (
    <div>
      <h2 className='text-3xl font-bold mb-5'>Add a Doctor</h2>
      <div className="p-2 space-y-2 md:w-1/2 w-full rounded-xl dark:bg-gray-900 dark:text-gray-100 shadow-xl lg:my-10 my-10">
        <h1 className="text-sm text-red-600 animate-pulse font-bold text-center my-4">{error}</h1>
        <form onSubmit={handleSubmit(handleAdd)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-400">Doctor Name</label>
            <input type="text" {...register("name", { required: true })} placeholder="Name" className="w-full px-4 py-3 input input-bordered input-primary rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-400">Email</label>
            <input type="email" {...register("email", { required: true })} placeholder="Email" className="w-full px-4 py-3 input input-bordered input-primary rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="select" className="block dark:text-gray-400">Specialty</label>
            <select {...register("speciality", { required: true })} className="select select-info w-full">
              {
                specialities.map(sp => <option key={sp._id}>{sp.name}</option>)

              }
            </select>
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="image" className="block dark:text-gray-400">Image</label>
            <input type="file" {...register("image", { required: true })} placeholder="image" className="w-full px-4 py-3 input input-bordered input-primary rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
          </div>
          <button type="submit" className="block w-full p-3 bg-accent text-white text-center rounded-xl dark:text-gray-900 dark:bg-violet-400">Login</button>
        </form>
      </div>

    </div>
  )
}

export default AddDoctor