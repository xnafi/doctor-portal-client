import React from 'react'
import chair from '../../assets/images/chair.png'
import bg from '../../assets/images/bg.png'

const BannerPage = () => {
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100"
        style={{backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize : 'contain'}}
        >
            <div className="flex md:flex-col justify-center mx-auto sm:py-12 lg:py-24 lg:flex-row flex-col-reverse md:justify-between px-2">
                <div className="flex flex-col justify-center text-left lg:w-1/2 w-full px-2 mt-10 lg:mt-0">
                    <h1 className="text-4xl font-bold leading-none sm:text-6xl">Your New Smile Starts Here
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                    </p>
                    <div className="">
                        <button rel="noopener noreferrer" href="#" className="btn bg-[#0FCFEC] md:text-lg text-sm font-semibold border rounded dark:border-gray-100 py-0">GET STARTED</button>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-8 lg:mt-0 lg:w-1/2 w-full">
                    <img src={chair} alt="" className="object-contain" />
                </div>
            </div>
        </section>
    )
}

export default BannerPage