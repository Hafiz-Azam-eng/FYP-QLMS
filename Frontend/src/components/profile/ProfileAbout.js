import React from 'react'

const ProfileAbout = ({
    profile: {
      bio,
      skills,
      user: { name }
    }
  }) => (
    <div className='flex flex-col p-8 gap-4 rounded border bg-teal-50 m-4'>
        <h1 className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold'>General Information</h1>
    <div className='flex flex-col items-start'>
        <h2 className='font-sans leading-4 text-start tracking-wider text-xl text-[#111827] font-semibold'>About me</h2>
        <h2 className='text-gray-500 text-start leading-2 font-sans mt-4'>{bio} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h2>
    </div>
    <div className='flex flex-col items-start gap-2'>
        <h2 className='font-sans leading-4 text-start tracking-wider text-xl text-[#111827] font-semibold'>Skills</h2>
        <div className='flex flex-row grid grid-cols-2 mt-4 gap-2'>
        {skills.map((skill, index) => (
        <div key={index} className='bg-[#DEF7EC] rounded-md p-2 text-[#03543f] w-28'>
        {skill}
    </div>
      ))}
        
        </div>
    </div>
</div>
  )


export default ProfileAbout