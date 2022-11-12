import React from 'react'
import appoinment from '../../assets/images/appointment.png'
const ContactUsPage = () => {
    return (
        <section className="p-6 dark:text-gray-100 text-white"
            style={{ backgroundImage: `url(${appoinment})` }}
        >
            <form noValidate="" className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-900 ng-untouched ng-pristine ng-valid">
                <div>
                    <h2 className="w-full font-bold leading-tight text-center">Contact us</h2>
                    <h2 className="w-full text-xl font-bold leading-tight text-center my-2">Stay connected with us</h2></div>
                <div>
                    <input id="name" type="text" placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
                </div>
                <div>
                    <input id="email" type="email" placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
                </div>
                <div>
                    <textarea id="message" type="text" placeholder="Message..." className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800"></textarea>
                </div>
                <div className='text-center'>
                    <button type="submit" className=" px-6 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-violet-400 focus:ring-violet-400 hover:ring-violet-400 dark:text-gray-900 bg-primary">Submit</button>
                </div>
            </form>
        </section>
    )
}

export default ContactUsPage