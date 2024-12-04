import React, { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import "../styles/blogPost.css";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/posts/posts.json")
      .then((response) => response.json())
      .then((data) => {
        const foundPost = data.find((p) => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          fetch(`/posts/${foundPost.postFileName}`)
            .then((response) => response.text())
            .then((text) => setContent(text));
        }
      });
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-post-container">
      <ReactMarkDown>{content}</ReactMarkDown>

      <p>Written by: {post.author}</p>
      <p>Tags: {post.postHashTags.join(", ")}</p>
    </div>
  );
};

export default BlogPost;
