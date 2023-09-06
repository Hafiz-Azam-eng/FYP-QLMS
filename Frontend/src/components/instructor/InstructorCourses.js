import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getInstructorCourses } from '../../redux/actions/course';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from "../button/Button";
import './course.css';

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

const InstructorCourses = ({ courses, getInstructorCourses }) => {
  useEffect(() => {
    getInstructorCourses();
  }, [getInstructorCourses]);

  if (!courses) {
    // If courses are not available yet, you can display a loading message or return null
    return <div>Loading...</div>;
  }

  const colors = ['#ffedcc', '#d4f6ed', '#e3dbfa', '#dff3fe'];
  let colorIndex = 0;

  return (
    <div className='flex flex-col w-full items-center gap-8'>
      <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>Courses</h2>
      <div className="flex justify-center flex-wrap gap-4 w-2/3">
      
            {courses?.map((course) => {
              const bgColor = colors[colorIndex % colors.length];
              colorIndex++;
    
              const courseStyles = {
                backgroundColor: bgColor,
              };
              
               console.log(`Background Class for course ${bgColor}`);
               return (
               <Link to={`/instructorcourses/${course._id}/announcements`}>
             <div key={course._id} className="flex flex-col border-2 border-slate-300 bg-gray-50 drop-shadow-md rounded-lg w-80 h-80 p-2">
               <div style={courseStyles} className={`p-1 rounded-lg h-64`}>
               <p className='font-sans text-start tracking-wide text-sm text-[#111827] font-bold px-6 mt-4'>{truncateString(course.instructorName, 15)}</p>
   
             <h3 className='font-sans text-start tracking-wide text-[#111827] text-xl font-semibold px-6 mt-6'>
                   {truncateString(course.name, 25)}</h3>
               <p className='font-sans text-start tracking-wide text-sm font-semibold px-6'>{truncateString(course.description, 15)}</p>
               </div>
               {/* <Button name='Go to Course'/> */}
             </div>
               </Link>
   )})}
         
      </div>
    </div>
  );
};

InstructorCourses.propTypes = {
    getInstructorCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
 
};

const mapStateToProps = (state) => ({
    courses: state.course.courses
});

export default connect(mapStateToProps, { getInstructorCourses })(InstructorCourses);
