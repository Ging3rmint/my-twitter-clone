import { FC, FormEvent, useState } from "react";
import styled from "styled-components";

import { COLORS } from "@variables";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import ImageUploadButton from "./ImageUploadButton";
import ImagePreview from "./ImagePreview";
import EmojiPickerButton, { IemojiObject } from "./EmojiPickerButton";

const { twitterExtraExtraLightGray } = COLORS;

const PostForm: FC = () => {
  const [imageFile, setImageFile] = useState(null);
  const [tweet, setTweet] = useState("");

  const onClearImage = () => {
    setImageFile(null);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onEmojiChange = (emojiObject: IemojiObject) => {
    const { emoji } = emojiObject;

    setTweet(tweet + emoji);
  };

  return (
    <PostFormContainer>
      <Button
        className='profile pill'
        to='/profile'
        img={{
          src: "./images/profile_morty.jpg",
          alt: "my profile image",
        }}
      />
      <form onSubmit={onFormSubmit}>
        <div className='top-wrapper'>
          <Input
            className='post-input'
            name='tweet'
            type='text'
            placeholder="What's happening?"
            value={tweet}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setTweet(e.currentTarget.value)
            }
          />
          {imageFile && (
            <ImagePreview imageFile={imageFile} onClearImage={onClearImage} />
          )}
        </div>
        <div className='bottom-wrapper'>
          <div className='settings-list'>
            <ImageUploadButton
              setImageFile={setImageFile}
              imageFile={imageFile}
            />
            <EmojiPickerButton onChange={onEmojiChange} />
          </div>
          <Input
            disabled={!!!tweet.length}
            className='form-submit'
            type='submit'
            value='Tweet'
          />
        </div>
      </form>
    </PostFormContainer>
  );
};

export default PostForm;

const PostFormContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${twitterExtraExtraLightGray};
  padding: 0 12px;

  form {
    width: 100%;
    padding-top: 10px;
    margin-left: 15px;

    .top-wrapper {
      width: 100%;
      border-bottom: 1px solid ${twitterExtraExtraLightGray};

      .post-input {
        display: block;
        width: 100%;
      }
    }

    .bottom-wrapper {
      width: 100%;
      padding: 6px 0;
      display: flex;
      justify-content: space-between;

      .settings-list {
        display: flex;
        align-items: center;
      }

      .form-submit {
        width: 80px;
        font-size: 12px;
        align-self: flex-start;
      }
    }
  }
`;
