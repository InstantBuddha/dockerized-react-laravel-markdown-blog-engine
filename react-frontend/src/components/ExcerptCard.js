import React from "react";
import { Link } from "react-router-dom";

const ExcerptCard = ({ index, postFrontalMatter }) => {
    return (
        <div key={index} className="excerpt-card-container">
            <Link to={`/posts/${postFrontalMatter.slug}`}>
                {postFrontalMatter.cover_image && (
                    <img
                        src={postFrontalMatter.cover_image}
                        alt={`${postFrontalMatter.title} cover`}
                        className="excerpt-card-cover-image"
                    />
                )}
            </Link>
            <h2>{postFrontalMatter.title}</h2>
            <p>
                <strong>Author:</strong> {postFrontalMatter.author}
            </p>
            <p>{postFrontalMatter.excerpt}</p>
            <Link to={`/posts/${postFrontalMatter.slug}`}>Read full post</Link>
        </div>
    );
};
export default ExcerptCard;
