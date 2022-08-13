import { FC, useState, MouseEvent, useRef } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

import { COLORS } from "@variables";
import ClickOutsideWrapper from "hooks/useClickOutside";
import Button from "components/atoms/Button";

const { twitterBlue } = COLORS;

export interface IemojiObject {
  activeSkinTone: string;
  emoji: string;
  names: string[];
  originalUnified: string;
  unified: string;
}

interface IEmojiPickerButton {
  onChange: (emojiObject: IemojiObject) => void;
}

const EmojiPickerButton: FC<IEmojiPickerButton> = ({ onChange }) => {
  const emojiBtnRef = useRef<HTMLButtonElement>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const onEmojiClick = (event: MouseEvent, emojiObject: IemojiObject) => {
    onChange(emojiObject);
    setEmojiPickerVisible(false);
  };

  const onOutsideClickHandler = (target: HTMLElement) => {
    if (emojiBtnRef.current && !emojiBtnRef.current.contains(target)) {
      setEmojiPickerVisible(false);
    }
  };

  return (
    <EmojiPickerButtonContainer>
      <Button
        ref={emojiBtnRef}
        onClick={() => setEmojiPickerVisible((prevState) => !prevState)}
        className='emoji-picker-btn pill'
        icon={{ icon: "insert_emoticon", size: 16, color: twitterBlue }}
      />
      {emojiPickerVisible && (
        <ClickOutsideWrapper
          className='emoji-picker-wrapper'
          onClickOutside={onOutsideClickHandler}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </ClickOutsideWrapper>
      )}
    </EmojiPickerButtonContainer>
  );
};

export default EmojiPickerButton;

const EmojiPickerButtonContainer = styled.div`
  position: relative;

  .emoji-picker-wrapper {
    position: absolute;
    z-index: 10;
  }
`;
