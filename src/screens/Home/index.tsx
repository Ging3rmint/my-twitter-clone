import React, { FC } from "react";
import styled from "styled-components";

import PostListing from "components/organisms/PostListing";

const index: FC = () => {
  return (
    <HomeContainer>
      <PostListing />
    </HomeContainer>
  );
};

export default index;

const HomeContainer = styled.div`
  padding-top: 10px;
`;
