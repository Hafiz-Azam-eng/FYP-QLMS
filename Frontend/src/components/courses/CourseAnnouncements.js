import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAnnouncements } from '../../redux/actions/announcement'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Azam from '../img/Azam.jpg'
import CommentForm from '../post/CommentForm';
import CourseAnnouncementsComment from './CourseAnnouncementsComment';
// import SecondaryHeader from './SecondaryHeader';


const CourseAnnouncements = ({ announcements, getAnnouncements }) => {
  const { courseid } = useParams();
  useEffect(() => {
    if (courseid) {
      getAnnouncements(courseid);
    }
  }, [getAnnouncements, courseid]);

  return (
    <>

      <div className="flex justify-center">
        {/* <h2 className="mb-3">Course Announcements</h2> */}
        {announcements.length === 0 ? (
          <p>No announcements for this course.</p>
        ) : (
          <div className="row">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="flex flex-col items-start mt-10 border-2 rounded w-[70rem] p-4">

              
                  <div className='flex flex-row gap-2'>
                  <img className="w-8 h-8 rounded-full ml-2" src={announcement.profilePicture} alt="" />
                    <h4 className='font-sans leading-2 tracking-wide text-xl text-slate-700 font-semibold'>{announcement.firstName}</h4>
                    {/* <p className="font-sans text-xs text-slate-400 font-semibold px-2 text-start">24.01.2021</p> */}
                  </div>
                  {/* <h3>
                      {announcement.title}
                      </h3> */}
                  <p className='font-sans leading-2 tracking-wide text-lg text-[#111827] font-semibold px-8 mt-4'>
                    {announcement.body}
                  </p>
                  {announcement.comments.map((comment) => (
                    <div key={comment._id} className='flex flex-col items-start mt-6 border rounded w-full p-4'>
                      <div className='flex flex-row'>
                       <img className="w-6 h-6 rounded-full" src={comment.profilePicture} alt="" />
                       <p className='font-sans text-xs text-slate-400 font-semibold px-2 text-start'>
                        {comment.date}
                      </p>
                   </div>     
                      <p className='font-sans leading-2 tracking-wide text-md text-[#111827] font-semibold px-4 mt-2'>

                      {comment.body}
                      </p>
                     {/* <CommentForm/> */}
                    </div>
                    
                    ))}
                    <CourseAnnouncementsComment postId={announcement._id}/>
                



              </div>
            ))}
          </div>
        )}
      </div></>
  );
};

CourseAnnouncements.propTypes = {
  getAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements,
});

export default connect(mapStateToProps, { getAnnouncements })(CourseAnnouncements);
