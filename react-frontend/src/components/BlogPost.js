import React, { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import "../styles/blog-post.css";
import { useParams } from "react-router-dom";
import { getOneBlogPost } from "../services/ApiServices";
import ErrorMessage from "./reuseable/ErrorMessage";
import { scrollToTop } from "../utils/WindowUtils";

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState("");
    const [metadata, setMetadata] = useState("");
    const [errorCode, setErrorCode] = useState(null);
    const errorMessageText =
        "There seems to be an error downloading the blog post.";

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getOneBlogPost(slug);
                const fullContent = data.content;

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
            } catch (error) {
                setErrorCode(error.response?.status || "Unknown error");
                setContent(
                    error.response?.data?.message ||
                        "Error loading post content"
                );
                scrollToTop();
            }
        };

        fetchPost();
    }, [slug]);

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-wrapper">
            <div className="blog-post-container">
                {errorCode ? (
                    <ErrorMessage
                        errorMessageText={errorMessageText}
                        errorCode={errorCode}
                    />
                ) : (
                    <>
                        {metadata.cover_image && (
                            <img
                                src={metadata.cover_image}
                                alt={`${metadata.title} cover`}
                                className="blog-post-cover-image"
                            />
                        )}
                        <ReactMarkDown>{content}</ReactMarkDown>
                        {metadata && (
                            <>
                                <p>Written by: {metadata.author}</p>
                                <p>Tags: {metadata.postHashTags.join(", ")}</p>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
