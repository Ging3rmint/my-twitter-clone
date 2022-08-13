import React, { FC, FormEvent } from "react";
import styled from "styled-components";

import { COLORS } from "@variables";

const { twitterBlack, twitterBlue, twitterDarkBlue } = COLORS;

interface IInput {
  type: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = ({
  type,
  placeholder,
  name,
  id,
  disabled,
  className,
  value,
  onChange,
}) => {
  return (
    <StyledInput
      id={id}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      name={name}
      className={className}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;

const StyledInput = styled.input<{ type: string; disabled?: boolean }>`
  border: none;
  white-space: pre-wrap;
  font-size: 16px;
  transition: background-color 0.15s ease-in-out;

  ${({ type, disabled }) => {
    const isSubmit = type === "submit";

    return {
      borderRadius: isSubmit ? "50px" : "0",
      cursor: isSubmit ? (disabled ? "not-allowed" : "pointer") : "text",
      padding: isSubmit ? "8px 0" : "2px 0",
      backgroundColor: isSubmit ? twitterBlue : "transparent",
      color: isSubmit ? "white" : twitterBlack,
      opacity: isSubmit && disabled ? "0.5" : "1",
      "&:hover": {
        backgroundColor: isSubmit
          ? disabled
            ? twitterBlue
            : twitterDarkBlue
          : "transparent",
      },
    };
  }}
`;
