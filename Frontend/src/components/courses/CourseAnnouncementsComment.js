import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';
import { RiSendPlane2Fill } from 'react-icons/ri'
import Azam from '../img/Azam.jpg'

const CourseAnnouncementsComment = ({ postId, addComment }) => {
  const [body, setBody] = useState('');

  return (
    <div className='w-full'>
      <form
        className='flex justify-center gap-4 mt-4'
        onSubmit={e => {
          e.preventDefault();
          console.log("Form Submitted");
          addComment(postId, { body });
          setBody('');
        }}
      >
        <img className="w-8 h-8 rounded-full self-center" src={Azam} alt="" />
        <div className='flex flex-row justify-center border rounded-full w-3/4 px-4'>
        <textarea
        className='outline-none mt-4 text-sm'
        name='text'
        placeholder='Add Class Comment...'
        cols='100'
        value={body}
        onChange={e => setBody(e.target.value)}
        required
        />
        </div>
        <button type='submit'>
          <RiSendPlane2Fill className='w-8 h-8 p-2 rounded bg-[#00A86B] text-white' />
        </button>
        
      </form>
    </div>
  );
};

CourseAnnouncementsComment.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CourseAnnouncementsComment);
