import React from 'react'
import AppointmentPage from './AppointmentPage'
import BannerPage from './BannePage'
import ContactUsPage from './ContactUsPage'
import InfoCards from './InfoCards'
import ServicesPage from './ServicesPage'
import TestimonialPage from './TestimonialPage'

const HomePage = () => {
    return (
        <>
            <BannerPage />
            <InfoCards />
            <ServicesPage />
            <AppointmentPage />
            <TestimonialPage />
            <ContactUsPage />

        </>
    )
}

export default HomePage