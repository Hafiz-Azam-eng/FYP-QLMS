import React from 'react'
import {AiOutlineClose} from 'react-icons/ai';

const VirtualKeyboard = () => {
  
  return (
    <div className='flex justify-center mt-8'>
        
        <div className='w-2/3 h-1/2 bg-gray-400 absolute z-30'>
            <div className='mt-px'>
                  <button className='flex justify-center items-center w-12 h-12 bg-white'>
                        <AiOutlineClose/>
                  </button>
            </div>
            <div className='mt-2'>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ض</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ص</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ث</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ق</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ف</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>غ</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ع</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ه</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>خ</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ح</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ج</button>
                  <button className='w-24 p-4 h-16 bg-white gap-2.5 m-px'>Backspace</button>
            </div>
            <div>
            <button className='w-16 h-16 bg-white gap-2.5 m-px'>ض</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ص</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ث</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ق</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ف</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>غ</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ع</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ه</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>خ</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ح</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ج</button>
                  <button className='w-24 p-4 h-16 bg-white gap-2.5 m-px'>Enter</button>
            </div>
            <div>
            <button className='w-16 h-16 bg-white gap-2.5 m-px'>ض</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ص</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ث</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ق</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ف</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>غ</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ع</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ه</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>خ</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ح</button>
                  <button className='w-16 h-16 bg-white gap-2.5 m-px'>ج</button>
                  <button className='w-24 p-4 h-16 bg-white gap-2.5 m-px'>Shift</button>
            </div>
            <div>
                  <button className='w-96 h-16 bg-white gap-2.5 m-px'>Space</button>
            </div>
        </div>
    </div>
  )
}

export default VirtualKeyboard