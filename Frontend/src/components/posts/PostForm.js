import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/post';
import Button from '../button/Button';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='flex w-3/4 m-4'>
     
      <form
        className='flex flex-col w-full drop-shadow-md gap-2'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          className='flex bg-gray-50 min-h-full drop-shadow-md p-2'
          name='text'
          placeholder='Announce Something to your class'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />

        <Button type="submit" value='Submit' name="Submit"/>
        {/* <input type='submit' className='btn btn-dark my-1' value='Submit' /> */}
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
