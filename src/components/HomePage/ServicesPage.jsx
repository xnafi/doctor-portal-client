import React from 'react';
import fluoride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'
import treatment from '../../assets/images/treatment.png'
import Service from './Service';

const ServicesPage = () => {

    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: whitening
        },
    ]

    return (
        <div>
            <section className='mt-16 px-2'>
                <div className='text-center'>
                    <h3 className='text-xl font-bold text-primary uppercase'>Our Services</h3>
                    <h2 className='text-3xl'>Services We Provide</h2>
                </div>
                <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        servicesData.map(service => <Service
                            key={service.id}
                            service={service}
                        ></Service>)
                    }
                </div>
            </section>
            <section className="hero min-h-screen flex lg:justify-between flex-col lg:flex-row mt-10 px-2 items-center">
                <div className="flex lg:justify-end lg:w-1/2 w-full">
                    <img src={treatment} alt='' className="max-w-sm rounded-lg shadow-2xl w-full" />
                </div>
                <div className='lg:w-1/2 w-full lg:px-20 px-0 mt-4 md:mt-0'>
                    <h1 className="lg:text-5xl text-3xl font-bold">Exceptional Dental Care on Your Terms</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;