import { useState, useEffect } from "react";

import { createPost, getAllPosts } from "../../api/services/postService";

const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      setPosts(await getAllPosts());
    })();
  }, []);

  return (
    <div>Posts</div>
  );
};

export default Posts;
