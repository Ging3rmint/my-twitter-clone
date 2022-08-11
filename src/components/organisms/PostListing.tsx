import { FC } from "react";
import styled from "styled-components";

import PostForm from "components/molecules/PostForm";

const PostListing: FC = () => {
  return (
    <PostListingContainer>
      <PostForm />
    </PostListingContainer>
  );
};

export default PostListing;

const PostListingContainer = styled.div`
  width: 500px;
  padding: 0 12px;
`;
