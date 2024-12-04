import React, { useEffect, useState } from "react";
import ExcerptCard from "../components/ExcerptCard";

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="card-list-container">
      {posts.map((post, index) => (
        <ExcerptCard index={index} post={post}/>
      ))}
    </div>
  );
};
export default MainPage;
