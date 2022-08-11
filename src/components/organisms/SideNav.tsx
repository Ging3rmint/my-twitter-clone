import { FC } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import { Container } from "@styled";
import { COLORS } from "@variables";
import Button from "components/atoms/Button";

const { twitterExtraExtraLightGray } = COLORS;

const SideNav: FC = () => {
  return (
    <Container style={{ display: "flex" }}>
      <SideNavContainer>
        <Button
          className='side-nav-btn pill'
          to='/'
          isNavLink
          icon={{
            icon: "twitter",
            size: 20,
          }}
        />
        <Button
          className='side-nav-btn pill'
          to='/'
          isNavLink
          name='Home'
          icon={{
            icon: "home",
            size: 20,
          }}
        />
        <Button
          className='side-nav-btn pill'
          to='/profile'
          name='Profile'
          isNavLink
          icon={{
            icon: "user-circle",
            size: 20,
          }}
        />
        <Button className='side-nav-btn pill primary' name='Tweet' />
      </SideNavContainer>
      <Outlet />
    </Container>
  );
};

export default SideNav;

const SideNavContainer = styled.nav`
  height: 100vh;
  border-right: 1px solid ${twitterExtraExtraLightGray};
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 0 20px;

  .side-nav-btn {
    margin-bottom: 10px;
    align-self: flex-start;

    &.primary {
      align-self: stretch;
    }
  }
`;
