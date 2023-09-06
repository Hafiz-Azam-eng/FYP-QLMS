import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import UploadCoursecontent from '../components/instructor/UploadCoursecontent'
import InstructorNavbar from '../components/instructor/InstructorNavbar';

const AddCourseContentPage = () => {
  return (
    <div>
        <InstructorNavbar/>
        <UploadCoursecontent/>
    </div>
  )
}

export default AddCourseContentPage