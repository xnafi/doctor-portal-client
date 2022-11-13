import React, { useEffect, useState } from 'react'
import AppoinmentBanner from './AppoinmentBanner'
import BookingModal from './BookingModal';
import ChooseServices from './ChooseServices';


function Appointment() {
    const [selected, setSelected] = useState(new Date());
    const [chooseServices, setChooseService] = useState([])
    const [treatment, setTreatment] = useState([])
    useEffect(() => {
        fetch('AppoinmentServices.json')
            .then(res => res.json())
            .then(data => setChooseService(data))



    }, [])

    return (
        <>
            <AppoinmentBanner selected={selected} setSelected={setSelected} />
            <ChooseServices chooseServices={chooseServices} setTreatment={setTreatment} selected={selected} />
            {
                treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} selected={selected} />
            }

        </>
    )
}

export default Appointment