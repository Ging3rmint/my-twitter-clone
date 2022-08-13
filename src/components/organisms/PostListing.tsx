import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Spin } from "antd";

import { ITweetPost, getPosts } from "api/posts";
import PostForm from "components/molecules/PostForm";
import TweetPost from "components/molecules/TweetPost";

const PostListing: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<ITweetPost[]>([]);

  const handleGetPost = async () => {
    const { result, metadata } = await getPosts();
    setIsLoading(true);
    setPosts(result);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  return (
    <PostListingContainer>
      <PostForm />
      <Spin spinning={isLoading}>
        <Listing>
          {posts.map((post) => (
            <TweetPost key={post.id} {...post} />
          ))}
        </Listing>
      </Spin>
    </PostListingContainer>
  );
};

export default PostListing;

const PostListingContainer = styled.div`
  width: 800px;
`;

const Listing = styled.div``;
