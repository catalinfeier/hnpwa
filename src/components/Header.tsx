import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

export function makeIsActive(path: string) {
  return function isActive(match: any, location: { pathname: string }) {
    return location.pathname.indexOf(path) !== -1;
  };
}

const NavContainer = styled.nav`
  padding: 20px 0;
  background: #20232a;
`

const LinkElem = styled(NavLink)`
  &.active {
    color: #61dafb;
  }
  color: white;
  padding: 10px;
`

export const Header = () => (
  <NavContainer>
    <LinkElem
      to="/news/1"
      isActive={makeIsActive("/news")}
    >
      Top
    </LinkElem>
    <LinkElem
      to="/newest/1"
      isActive={makeIsActive("/newest")}
    >
      New
    </LinkElem>
    <LinkElem
      to="/show/1"
      isActive={makeIsActive("/show")}
    >
      Show
    </LinkElem>
    <LinkElem
      to="/ask/1"
      isActive={makeIsActive("/ask")}
    >
      Ask
    </LinkElem>
    <LinkElem
      to="/jobs/1"
      isActive={makeIsActive("/jobs")}
    >
      Jobs
    </LinkElem>
  </NavContainer>
);
