import React from 'react'
import Azam from "../img/Azam.jpg"
import PropTypes from 'prop-types';

const DashboardTop = ({
    profile: {
        country,
        bio,
        address,
        contact,
        user: { _id , profilepicture}
    }
}) => {
    return (
        <>

            <div className='flex flex-col p-8 gap-4 rounded border bg-zinc-200 m-4'>
                <div className="flex flex-col items-center space-x-4">
                    <img className="w-14 h-14 rounded-full" src={profilepicture} alt="" />
                    <div className="font-medium dark:text-white">
                        <div className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>Hafiz Azam</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Country</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{country}</h2>
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Bio</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{bio}</h2>
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Address</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{address}</h2>
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='font-sans leading-2 tracking-wide text-sm text-gray-600 text-start'>Contact</h2>
                    <h2 className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827]'>{contact}</h2>
                </div>
            </div>
        </>
    )
}

DashboardTop.propTypes = {
    profile: PropTypes.object.isRequired
  };

export default DashboardTop

