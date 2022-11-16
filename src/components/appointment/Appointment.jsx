import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import Loading from '../shared/Loading';
import AppoinmentBanner from './AppoinmentBanner'
import BookingModal from './BookingModal';
import ChooseServices from './ChooseServices';


function Appointment() {
    const [selected, setSelected] = useState(new Date());
    const [treatment, setTreatment] = useState([])
    const date = format(selected, 'PP');
    const { data: chooseServices = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['appointmentOptions', date],
            queryFn: () => fetch(`http://localhost:5000/appointmentOptions?date=${date}`).then(res => res.json())
        }
    )
    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <AppoinmentBanner selected={selected} setSelected={setSelected} />
            <ChooseServices chooseServices={chooseServices} setTreatment={setTreatment} selected={selected} />
            {
                treatment && <BookingModal treatment={treatment} refetch={refetch} setTreatment={setTreatment} selected={selected} />
            }

        </>
    )
}

export default Appointment