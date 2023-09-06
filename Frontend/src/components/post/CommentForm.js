import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';
import { RiSendPlane2Fill } from 'react-icons/ri'

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='border w-[70rem]'>
      <form
        className='flex items-center'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <div>

        <textarea
        className='border rounded-full m-2 px-4 pt-4'
        name='text'
        cols='110'
        rows='2'
        placeholder='Add Class Comment...'
        value={text}
        onChange={e => setText(e.target.value)}
        required
        />
        </div>
        <button type='submit' className='btn btn-dark my-1'>
          <RiSendPlane2Fill className='w-8 h-8 text-[#00A86B]' />
        </button>
        
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
