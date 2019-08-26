import React from "react";
import { Link, NavLink } from "react-router-dom";

export function makeIsActive(path: string) {
  return function isActive(match: any, location: { pathname: string }) {
    return location.pathname.indexOf(path) !== -1;
  };
}

export const Header = () => (
  <nav className="Header">
    <NavLink
      activeClassName="Header__navlink--active"
      className="Header__navlink"
      to="/news"
      isActive={makeIsActive("/news")}
    >
      Top
    </NavLink>
    <NavLink
      activeClassName="Header__navlink--active"
      className="Header__navlink"
      to="/newest"
      isActive={makeIsActive("/newest")}
    >
      New
    </NavLink>
    <NavLink
      activeClassName="Header__navlink--active"
      className="Header__navlink"
      to="/show/1"
      isActive={makeIsActive("/show")}
    >
      Show
    </NavLink>
    <NavLink
      activeClassName="Header__navlink--active"
      className="Header__navlink"
      to="/ask/1"
      isActive={makeIsActive("/ask")}
    >
      Ask
    </NavLink>
    <NavLink
      activeClassName="Header__navlink--active"
      className="Header__navlink"
      to="/jobs/1"
      isActive={makeIsActive("/jobs")}
    >
      Jobs
    </NavLink>
    <a
      href="https://github.com/taehwanno/hnpwa-react"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="Header__title">HNPWA with React</span>
    </a>
  </nav>
);
