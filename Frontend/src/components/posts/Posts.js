import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../redux/actions/post';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="flex ml-60 flex-col items-start">
      <h1 className="font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold">Posts</h1>
      <p className="font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-semibold">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="flex flex-col">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
