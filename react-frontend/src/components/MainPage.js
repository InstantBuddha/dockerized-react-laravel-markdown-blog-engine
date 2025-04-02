import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBlogPostsRegistry } from "../services/ApiServices";
import { scrollToTop } from "../utils/WindowUtils";
import ExcerptCard from "../components/ExcerptCard";
import ErrorMessage from "./reuseable/ErrorMessage";

const MainPage = () => {
    const [postsFrontalMatters, setPostsFrontalMatters] = useState([]);
    const [errorCode, setErrorCode] = useState(null);
    const [errorMessageText, setErrorMessageText] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 5;

    useEffect(() => {
        fetchPosts(currentPage);
        // Intentionally only want to run fetchPosts only to run once, so we need to disable the following warning:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPosts = async (page) => {
        try {
            const response = await getBlogPostsRegistry(page, perPage);
            
            if (response.data && response.data.data) {
                const data = response.data;

                setPostsFrontalMatters((prevPosts) => [
                    ...prevPosts,
                    ...data.data,
                ]);

                setHasMore(page < data.total_pages);
            } else {
                throw new Error("Unexpected response structure from backend.");
            }
        } catch (error) {
            setErrorCode(error.response?.status || "Unknown error");
            setErrorMessageText(
                error.response?.data?.message ||
                    "There seems to be an error downloading the post registry."
            );
            scrollToTop();
        }
    };

    const fetchNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchPosts(nextPage);
    };

    return (
        <div className="page-wrapper">
            {errorCode ? (
                <ErrorMessage
                    errorMessageText={errorMessageText}
                    errorCode={errorCode}
                />
            ) : (
                <InfiniteScroll
                    dataLength={postsFrontalMatters.length}
                    next={fetchNextPage}
                    hasMore={hasMore}
                    loader={<h4>Loading more posts...</h4>}
                    endMessage={<p>You have seen all posts.</p>}
                >
                    <div className="card-list-container">
                        {postsFrontalMatters.map((postFrontalMatter, index) => (
                            <ExcerptCard
                                postFrontalMatter={postFrontalMatter}
                                key={`${postFrontalMatter.slug}-${index}`}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};
export default MainPage;
