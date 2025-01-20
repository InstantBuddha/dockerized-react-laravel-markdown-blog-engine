import React, { useEffect, useState } from "react";
import { getBlogPostsRegistry } from "../services/ApiServices";
import { scrollToTop } from "../utils/WindowUtils";
import ExcerptCard from "../components/ExcerptCard";
import ErrorMessage from "./reuseable/ErrorMessage";

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const errorMessageText =
        "There seems to be an error downloading the post registry.";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getBlogPostsRegistry();
                setPosts(response.data);
            } catch (error) {
                if (error?.response?.status) {
                    setErrorCode(error.response.status);
                    scrollToTop();
                    return;
                }
                setErrorCode("Unkown error");
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="card-list-container">
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
