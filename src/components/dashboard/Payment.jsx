import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CheckOutPage from './CheckoutPage'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Payment = () => {
    const paymentDetails = useLoaderData()
    return (
        <div>
            <h2 className='text-2xl font-bold'>Payment for {paymentDetails.treatment}</h2>
            <h2 className='text-xl font-semibold'>Please pay {paymentDetails.price} for your appoinment</h2>
            <div className='md:w-1/2 w-full'>
                <Elements stripe={stripePromise}>
                    <CheckOutPage paymentDetails={paymentDetails}/>
                </Elements>
            </div>

        </div >
    )
}

export default Payment