import React, { useEffect, useState } from "react";
import { getBlogPostsRegistry } from "../services/ApiServices";
import { scrollToTop } from "../utils/WindowUtils";
import ExcerptCard from "../components/ExcerptCard";
import ErrorMessage from "./reuseable/ErrorMessage";

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const [errorMessageText, setErrorMessageText] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getBlogPostsRegistry();
                setPosts(response.data);
            } catch (error) {
                setErrorCode(error.response?.status || "Unknown error");
                setErrorMessageText(
                    error.response?.data?.message ||
                        "There seems to be an error downloading the post registry."
                );
                scrollToTop();
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="page-wrapper">
            {errorCode ? (
                <ErrorMessage
                    errorMessageText={errorMessageText}
                    errorCode={errorCode}
                />
            ) : (
                <div className="card-list-container">
                    {posts.map((post, index) => (
                        <ExcerptCard index={index} post={post} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default MainPage;
