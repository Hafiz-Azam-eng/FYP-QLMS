import React from 'react'
import { useState } from 'react';
import { BsFillKeyboardFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai'
import '../../constants/fonts.css'
import Typed from 'react-typed';
import './header.css'

import VirtualKeyboard from '../VR keyboard/VirtualKeyboard';

const Header = (data) => {
    const [searchValue, setSearchValue] = useState('');
    const [toggle, setToggle] = useState(false);

    function handleChildData(data) {
        console.log('Data received from child:', data);
        setSearchValue(data);
    }

    return (

        <>
            <div className='text w-full py-[50px]'>
                <div className='max-w-[1240px] my-[50px] mx-auto text-center font-bold '>
                    <div className='text-2xl text-white '>
                        Learn With us
                    </div>
                    <div className='text-4xl md:text-4xl mt-8 text-white'>
                        <Typed className='mt-[40px] font-[CustomFontName] '
                            strings={['بِسۡمِ اللّٰہِ الرَّحۡمٰنِ الرَّحِیۡمِ', ' اَلۡحَمۡدُ لِلّٰہِ رَبِّ الۡعٰلَمِیۡنَ ۙ ', 'الرَّحۡمٰنِ الرَّحِیۡم', 'مٰلِکِ یَوۡمِ الدِّیۡنِ(3)']}
                            typeSpeed={100}
                            loop={true}
                        />
                    </div>
                    <div className='text-[#F9DFAD] text-xl md:text-[50px] md:mt-12'>
                        {/* <Typed
                            strings={['In the Name of Allah—the Most Compassionate, Most Merciful.', 'All praise is for Allah—Lord of all worlds,', 'the Most Compassionate, Most Merciful,','Master of the Day of Judgment.']}
                            typeSpeed={100}
                            loop={true}
                        /> */}
                    </div>

                </div>

                <div className='flex justify-center'>
                    <div className='flex justify-between items-center bg-white shadow-lg w-3/6 h-8 md:h-14 mt-6 z-0 absolute'>
                        <div className='flex flex-row'>
                            <div className='flex items-center'>
                                <AiOutlineSearch className='w-6 h-6 ml-4 text-gray-500' />
                            </div>
                            <div className='flex ml-2 '>
                                {searchValue === '' ?
                                    <input className=" placeholder:text-slate-400 md:placeholder:text-[20px] bg-white border-none rounded-md py-2 pl-3 md:pl-9 pr-3 focus:outline-none text-[18px] md:text-md" placeholder='Search' type="text" name="search" />
                                    :
                                    <input value={searchValue} className="placeholder:text-slate-400 md:placeholder:text-[20px] block bg-white  md:w-96 border-none rounded-md py-2 pl-3 md:pl-9 pr-3 focus:outline-none text-[10px] md:text-md" placeholder='Search' type="text" name="search" />

                                }
                            </div>
                        </div>
                        <div className='flex flex-row gap-16 items-center mr-4'>

                            <BsFillKeyboardFill className='w-10 h-6' onClick={() => { setToggle(!toggle) }} />

                            <button className='bg-[#00A86B] text-white text-[10px] md:text-[16px] font-bold w-16 h-7 md:w-24 md:h-10'>
                                Search
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            <div className='flex items-center justify-center'>
                {
                    toggle ? <VirtualKeyboard /> : null
                }

            </div>



        </>
    )
}

export default Header