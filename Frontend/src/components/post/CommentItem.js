import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../redux/utils/formatDate';
import { deleteComment } from '../../redux/actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="flex flex-col items-start mt-10 border rounded w-[70rem] p-4">
    <div>
      {/* <Link className='flex flex-row' to={`/profile/${user}`}>
        <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link> */}

<Link className='flex flex-row' to={`/profile/${user}`}>
        <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
        <div className='flex flex-col'>
        <h4 className='font-sans leading-2 tracking-wide text-base text-slate-700 font-semibold px-2'>{name}</h4>
        <p className="font-sans text-xs text-slate-400 font-semibold px-2 text-start">{formatDate(date)}</p>
        </div>
      </Link>

    </div>
    <div>
      <p className="font-sans leading-2 tracking-wide text-lg text-[#111827] font-semibold px-8 mt-4">{text}</p>
      
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
