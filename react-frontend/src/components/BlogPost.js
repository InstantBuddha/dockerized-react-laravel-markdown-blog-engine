import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import "../styles/blogPost.css";
import { useParams } from "react-router-dom";

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState("");
    const [metadata, setMetadata] = useState("");
    const [errorCode, setErrorCode] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost/api/blog-post/${slug}`)
            .then((response) => {
                console.log(response.data.content);
                const fullContent = response.data.content;

                // Extract the front matter
                const endOfFrontMatter = fullContent.indexOf("}") + 1;
                const frontMatterJson = fullContent.substring(
                    0,
                    endOfFrontMatter
                );
                const frontMatter = JSON.parse(frontMatterJson);

                // Extract the markdown content
                const markdownContent = fullContent
                    .substring(endOfFrontMatter)
                    .trim();

                setMetadata(frontMatter);
                setContent(markdownContent);
                setPost(slug);
            })
            .catch((error) => {
                setContent(error.response.data.message);
                console.error(error.response.data.message);
                setErrorCode(error);
            });
    }, [slug]);

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-post-container">
            <ReactMarkDown>{content}</ReactMarkDown>

            {metadata && (
                <>
                    {" "}
                    <p>Written by: {metadata.author}</p>{" "}
                    <p>Tags: {metadata.postHashTags.join(", ")}</p>{" "}
                </>
            )}
        </div>
    );
};

export default BlogPost;
