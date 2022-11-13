import { format } from 'date-fns'
import React from 'react'
import ServiceCard from './ServiceCard'

const ChooseServices = ({ chooseServices, selected,setTreatment }) => {
    return (
        <div className='my-10'>
            <h3 className='text-primary font-bold text-xl text-center my-6'>Available Appointments on {format(selected, 'PP')}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-10 px-2'>
               {
                chooseServices.map(chooseService => <ServiceCard setTreatment={setTreatment} key={chooseService._id} chooseService={chooseService}/>)
               }
            </div>
        </div>
    )
}

export default ChooseServices