import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEnrolledCourses } from '../../redux/actions/enrollment';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const EnrolledCourses = ({ enrollments, getEnrolledCourses }) => {
  useEffect(() => {
    getEnrolledCourses();
  }, [getEnrolledCourses]);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };
  
  return (
    // <div style={{ marginTop: 60 }}>
    //   <h2>Enrolled Courses</h2>
    //   <div className="row">
    //     {enrollments.map((course) => (
    //       <div key={course._id} className="col-md-4">
    //         <Card className="mb-3">
    //           <Card.Body>
    //             <Card.Title>{course.name}</Card.Title>
    //             <Card.Text>{course.description}</Card.Text>
                
    //             <Link to={`/courses/${course._id}/announcements`}>
    //             <Button variant="primary">Go to course</Button>
    //             </Link>
    //           </Card.Body>
    //         </Card>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className='flex flex-col w-full items-center gap-8'>
      <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>Courses</h2>
      <div className="flex justify-center flex-wrap gap-4 w-2/3">
        
        {enrollments && enrollments.map((course) => (
            <Link to={`/courses/${course._id}/announcements`}>
          <div key={course._id} className="flex flex-col border-2 border-slate-300 rounded-lg w-64 h-64">
            <div className='mini'>

          <h3 className='font-sans leading-2 text-start tracking-wide text-xl text-white font-semibold px-4 mt-2'>
                {truncateString(course.name, 15)}</h3>
            <p className='font-sans text-start tracking-wide text-sm text-white font-semibold px-4'>{truncateString(course.description, 15)}</p>
            </div>
            {/* <Button name='Go to Course'/> */}
            {/* <p className='font-sans text-start tracking-wide text-sm text-[#111827] font-semibold px-4'>{truncateString(course.instructorName, 15)}</p> */}
          </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

EnrolledCourses.propTypes = {
  getEnrolledCourses: PropTypes.func.isRequired,
  enrollments: PropTypes.array.isRequired,
 
};

const mapStateToProps = (state) => ({
    enrollments: state.enrollment.enrollments
});

export default connect(mapStateToProps, { getEnrolledCourses })(EnrolledCourses);
