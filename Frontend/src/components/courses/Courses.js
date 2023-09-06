import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/course';
import { enrollCourse } from '../../redux/actions/enrollment';
import PropTypes from 'prop-types';
// import Button from '../button/Button'

import Card from 'react-bootstrap/Card';
import Button from '../button/Button';


const Courses = ({ courses, getCourses, enrollCourse }) => {
  useEffect(() => {
    getCourses();
    // Fetch course details here
  }, [getCourses]);
  const handleEnroll = (courseId) => {
    enrollCourse(courseId);
  }


  return (
    <div className='flex flex-col w-full justify-center items-center gap-8'>
      <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>Courses</h2>
      <div className='mx-auto w-2/3'>

      <div className="flex justify-center flex-wrap gap-8 w-full">
        {courses.map((course) => (
          <div key={course._id} className="flex flex-col justify-between border-2 border-slate-300 rounded-lg w-64 h-64">
            <div className="mini">
              <div>
                <div className='font-sans leading-2 text-start tracking-wide text-xl text-white font-semibold px-4 mt-2'>{course.name}</div>
                <div className='font-sans text-start tracking-wide text-sm text-white font-semibold px-4'>{course.description}</div>
                
              </div>
              
            </div>
            {/* <h3>{course.name}</h3>
            <p>{course.description}</p>
          <Button variant="primary" name='Enroll' onClick={() => handleEnroll(course._id)} >Enroll</Button> */}
            

            <button className='h-10 rounded bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white' onClick={() => handleEnroll(course._id)} >
                  {/* <Button name='Enroll' className='bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white'/> */}
                  Enroll
                </button>
          

          </div>
        ))}
      </div>
</div>
    </div>


  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  enrollCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.course.courses
});

export default connect(mapStateToProps, { getCourses, enrollCourse })(Courses);