import React from 'react';

const InfoCard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className='px-2 flex flex-col justify-center items-start'>
            <div className={`card text-white px-4 py-5 md:card-side shadow-xl ${bgClass}`}>
                <figure>
                    <img src={icon} alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>

    );
};

export default InfoCard;