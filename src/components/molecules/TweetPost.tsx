import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLORS } from "@variables";
import { ITweetPost } from "api/posts";
import Button from "components/atoms/Button";

const { twitterBlack, twitterDarkGray, twitterExtraExtraLightGray } = COLORS;

const TweetPost: FC<ITweetPost> = ({
  message,
  tags,
  user,
  imageUrl,
  likes,
  comments,
  retweet,
  created,
}) => {
  const { displayName, username, image } = user;

  return (
    <TweetPostContainer>
      <div className='header'></div>
      <div className='body'>
        <Button
          className='profile pill'
          to={`/profile?=${username}`}
          img={{
            src: image,
            alt: "profile image",
          }}
        />
        <div className='content'>
          <p className='title'>
            <Link to={`/profile?=${username}`}>{displayName}</Link>@{username}
          </p>
          <p className='story'>{message}</p>
        </div>
        <div className='control'></div>
      </div>
    </TweetPostContainer>
  );
};

export default TweetPost;

const TweetPostContainer = styled.div`
  padding: 6px 12px;
  border-bottom: 1px solid ${twitterExtraExtraLightGray};

  .body {
    display: flex;
    font-size: 13px;

    .content {
      margin-left: 10px;

      p {
        margin: 0;
      }

      .title {
        color: ${twitterDarkGray};

        a {
          display: inline-block;
          margin-right: 5px;
          font-weight: bold;
          color: ${twitterBlack};

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
