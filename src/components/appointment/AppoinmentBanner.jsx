import React from 'react'
import bg from '../../assets/images/bg.png'
import chair from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';

const AppoinmentBanner = ({ selected, setSelected }) => {
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100"
            style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}
        >
            <div className="flex md:flex-col justify-center mx-auto sm:py-12 lg:py-24 lg:flex-row flex-col-reverse md:justify-between px-2">
                <div className="flex flex-col items-center justify-center lg:w-1/2 w-full px-2 mt-10 lg:mt-0">
                    <DayPicker
                        className='bg-white shadow-xl p-2 rounded-lg'
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
                <div className="flex items-center justify-center mt-8 lg:mt-0 lg:w-1/2 w-full">
                    <img src={chair} alt="" className="object-contain" />
                </div>
            </div>
        </section>
    )
}

export default AppoinmentBanner