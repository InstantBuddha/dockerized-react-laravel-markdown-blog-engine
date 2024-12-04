import React from "react";
import { Link } from "react-router-dom";

const ExcerptCard = ({ index, post }) => {
  return (
    <div key={index} className="excerpt-card-container">
      <h2>{post.title}</h2>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>{post.excerpt}</p>
      <Link to={`/posts/${post.slug}`}>Read full post</Link>
    </div>
  );
};
export default ExcerptCard;
