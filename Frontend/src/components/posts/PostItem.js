import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../redux/utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import {AiTwotoneLike} from 'react-icons/ai'
import {AiTwotoneDislike } from 'react-icons/ai'

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div className="flex flex-col items-start mt-10 border rounded w-[70rem] p-4">
   

      <Link className='flex flex-row' to={`/profile/${user}`}>
        <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
        <div className='flex flex-col'>
        <h4 className='font-sans leading-2 tracking-wide text-base text-slate-700 font-semibold px-2'>{name}</h4>
        <p className="font-sans text-xs text-slate-400 font-semibold px-2 text-start">{formatDate(date)}</p>
        </div>
      </Link>
   
  
    <div>
      <p className="font-sans leading-2 tracking-wide text-lg text-[#111827] font-semibold px-8 mt-4">{text}</p>
      

      <button
        onClick={() => addLike(_id)}
        type="button"
        className="btn btn-light"
      >
        <AiTwotoneLike/>{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button
        onClick={() => removeLike(_id)}
        type="button"
        className="btn btn-light"
      >
        <AiTwotoneDislike/>
      </button>
      <Link to={`/posts/${_id}`} className="btn btn-primary">
        Discussion{' '}
        {comments.length > 0 && (
          <span className="comment-count">{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deletePost(_id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
