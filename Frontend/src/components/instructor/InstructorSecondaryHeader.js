import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {AiOutlinePlus} from 'react-icons/ai'

// import { Nav } from 'react-bootstrap';
import { BsClipboardData, BsCardChecklist, BsCheck } from 'react-icons/bs';

const InstructorSecondaryHeader = ({courseId}) => {
    
    useEffect(() => { 
      }, );
    
   
  return (
    
    <div className='flex justify-center'>

    <div className='flex flex-row'>
      <div className='flex flex-col border-2 rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-gray-200'>
        <Link  to={`/courses/${courseId}/instructorcourseassignments`} className="flex flex-row ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Add New Assignment</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-gray-200'>
        <Link exact to={`/courses/${courseId}/addquiz`} className="flex flex-row">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Add New Quizz</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-gray-200'>
        <Link  to={`/courses/${courseId}/UploadCourseContent`} className="flex flex-row ">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Add Course Content</div>
        </Link>
      </div>
      <div className='flex flex-col border-2 rounded-lg w-60 h-28 m-8 place-content-center items-center hover:bg-gray-200'>
        <Link exact to="/marks" className="flex flex-row">
        <AiOutlinePlus className='w-6 h-6'/>
          <div>Add Marks</div>
        </Link>
      </div>
    </div>
    </div>
    
  );
};


  
  export default InstructorSecondaryHeader;