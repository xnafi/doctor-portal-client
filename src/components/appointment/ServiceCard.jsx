import React from 'react'

const ServiceCard = ({ chooseService, setTreatment }) => {
    const { name, slots,price } = chooseService
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary font-bold text-center">{name}</h2>
                <p className='font-semibold'>
                    {
                        slots.length === 0 && <span>try another day</span>
                    }
                </p>
                <p className='font-semibold'> {slots.length} {slots.length > 0 ? 'spaces' : 'space'   } available </p>
                <p className='font-semibold'> Price : ${price} </p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        htmlFor="booking-modal"
                        className="btn btn-primary text-white"
                        onClick={() => setTreatment(chooseService)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard