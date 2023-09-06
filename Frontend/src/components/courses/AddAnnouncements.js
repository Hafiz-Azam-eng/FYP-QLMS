import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addAnnouncement} from '../../redux/actions/announcement'
import { Link, useParams} from 'react-router-dom';
import Button from '../button/Button';

const AddAnnouncements = ({ addAnnouncement }) => {
  const {courseid} = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(courseid, { title, body });
    setTitle('');
    setBody('');
  };
  
  return (
    <section className="flex ml-60 flex-col items-start">
    <h1 className="font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold">Add Announcements</h1>
    <p className="font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-semibold">
      <i className="fas fa-user" /> Welcome to Course Community
    </p>
    <div className='flex w-3/4 m-4'>
      {/* <div className='bg-primary p'>
        <h3>Post Announcment...</h3>
      </div> */}
      <form
        className='flex flex-col w-full drop-shadow-md gap-2'
        onSubmit={
        onSubmit}
      >
        <textarea
          className='flex bg-gray-50 min-h-full drop-shadow-md p-2'
          name='body'
          placeholder='Announce Something to your class'
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />

        {/* <textarea
          name='title'
          cols='30'
          rows='5'
          placeholder='Subject of Announcemnt'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /> */}
        
        {/* <textarea
          name='body'
          cols='30'
          rows='5'
          placeholder='Add Description'
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        /> */}
        {/* <input type='submit' className='btn btn-dark my-1' value='Submit' /> */}
        <Button type='submit' value='Submit' name='Submit'/>
      </form>
    </div>
    </section>
  );
};

AddAnnouncements.propTypes = {
    addAnnouncement: PropTypes.func.isRequired
};

export default connect(null,{ addAnnouncement }
)(AddAnnouncements);
