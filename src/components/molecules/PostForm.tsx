import { FC } from "react";
import styled from "styled-components";

import { COLORS } from "@variables";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const { twitterExtraExtraLightGray } = COLORS;

const PostForm: FC = () => {
  return (
    <PostFormContainer>
      <Button
        className='profile-btn pill'
        img={{
          src: "./images/profile_morty.jpg",
          alt: "my profile image",
        }}
      />
      <form>
        <div className='top-wrapper'>
          <div className='top-wrapper--field'>
            <Input
              className='post-input'
              name='tweet'
              type='text'
              placeholder="What's happening?"
            />
          </div>
        </div>
        <div className='bottom-wrapper'>
          <ul className='settings-list'></ul>
          <Input disabled className='form-submit' type='submit' value='Tweet' />
        </div>
      </form>
    </PostFormContainer>
  );
};

export default PostForm;

const PostFormContainer = styled.div`
  display: flex;
  width: 100%;

  .profile-btn {
    overflow: hidden;
    width: 50px;
    padding: 0;
    align-self: flex-start;
  }

  form {
    width: 100%;
    padding-top: 10px;
    margin-left: 15px;

    .top-wrapper {
      padding-bottom: 25px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${twitterExtraExtraLightGray};
    }

    .bottom-wrapper {
      padding: 6px 0;
      display: flex;
      justify-content: space-between;

      .form-submit {
        width: 80px;
        font-size: 12px;
      }
    }
  }
`;