import { FC } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { IconProps } from "react-icomoon";

import { COLORS } from "@variables";
import Icon from "./Icon";

const {
  twitterExtraLightGray,
  twitterBlack,
  twitterBlue,
  twitterDarkBlue,
  twitterExtraExtraLightGray,
} = COLORS;

interface IImage {
  src: string;
  alt: string;
}

interface IButton {
  img?: IImage;
  name?: string;
  icon?: IconProps;
  to?: string;
  isNavLink?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: FC<IButton> = ({
  to,
  isNavLink,
  img,
  name,
  icon,
  onClick,
  className,
}) => {
  return (
    <StyledButton
      $name={name}
      as={to ? (isNavLink ? NavLink : Link) : "button"}
      to={to}
      onClick={onClick}
      className={className}
    >
      {img && <img className='btn-img' src={img.src} alt={img.alt} />}
      {icon && <Icon className='btn-icon' {...icon} />}
      {name && <span>{name}</span>}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ $name?: string }>`
  display: flex;
  font-size: 16px;
  padding: ${({ $name }) => ($name ? "8px 20px 8px 10px" : "8px 10px")};
  align-items: center;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  color: ${twitterBlack};
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    color: ${twitterBlack};
    background-color: ${({ $name }) =>
      $name ? twitterExtraLightGray : twitterExtraExtraLightGray};
  }

  &.active {
    font-weight: bold;
  }

  &.pill {
    border-radius: 50px;
  }

  &.primary {
    justify-content: center;
    padding: 8px 0;
    background-color: ${twitterBlue};
    color: white;

    &:hover {
      background-color: ${twitterDarkBlue};
    }
  }

  .btn-icon ~ span {
    display: inline-block;
    margin-left: 10px;
  }

  .btn-img {
    width: 100%;
    object-fit: cover;
  }
`;
