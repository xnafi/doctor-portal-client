import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Link } from 'react-router-dom';


const CheckOutPage = ({ paymentDetails }) => {

    const [cardError, setCardError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('');
    const [transationId, setTransationId] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe()
    const elements = useElements()
    const { patient, email, price, _id } = paymentDetails


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctor-portal-server-ivory.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then(
                (data) => {
                    setClientSecret(data.clientSecret)
                }
            )
            .catch(er => console.log(er))
    }, [price]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe && !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('')
        setIsLoading(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {

            setIsLoading(false)
            const updateDoc = {
                price,
                transationId: paymentIntent.id,
                email,
                id: _id
            }
            fetch(`https://doctor-portal-server-ivory.vercel.app/payments`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updateDoc)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        setSuccess('Congrats your payment completed')
                        setTransationId(paymentIntent.id)
                    }
                })
                .catch(er => console.log(er))
        }
    }





    return (
        <form onSubmit={handleSubmit} className='my-10'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className='btn btn-warning my-10' type="submit" disabled={!stripe || !clientSecret || isLoading}>
                Pay
            </button>
            <div className='my-3'>
                <span className='text-red-600 font-bold animate-pulse'>{cardError}</span>
            </div>
            <div className='my-3'>
                {

                    success && <>
                        <span className='text-red-600 font-bold animate-pulse'>{success}</span><br />
                        <span className='text-red-600 font-bold animate-pulse'>Your Transition Id :  {transationId}</span>
                        <Link to='/dashboard' className='btn btn-primary my-2'>Back to dashboard</Link>
                    </>
                }
            </div>

        </form>
    );
};


export default CheckOutPage
