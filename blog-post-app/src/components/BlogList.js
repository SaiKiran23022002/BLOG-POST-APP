import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../actions/blogActions";
import "../css/BlogList.css";

const BlogList = ({ posts, deletePost }) => {
  return (
    <div className="blog-list">
      <div className="top-right">
        <Link to="/add">
          <button className="add-button">Add New Post</button>
        </Link>
      </div>
      <h2 className="blog-list-title">Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="no-posts-message">
          No posts available. Add your first post!
        </p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li className="post-item" key={post.id}>
              <h3 className="post-title">{post.title}</h3>
              <div className="post-buttons">
                <Link to={`/view/${post.id}`}>
                  <button className="delete-button">View</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.blog.posts,
});

export default connect(mapStateToProps, { deletePost })(BlogList);
