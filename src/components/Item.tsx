import React from "react";
import styled from "styled-components";
import { NewsItem } from "../stores/Types";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
  text-align: left;
`;

const StyledNavLink = styled(NavLink)`
  margin: 0 5px 0 5px;
`;

const Meta = styled.div`
  display: flex;
  font-size: 13px;
  color: #060505b3;
  margin-top: 10px;
`;

export const Item = (props: { item: NewsItem }) => {
  const { item } = props;
  return (
    <Container>
      <StyledLink href={item.url}>{item.title}</StyledLink>
      <Meta>
        {`${item.points} points by `}
        <StyledNavLink to={`/user/${item.user}`}>{item.user}</StyledNavLink>
        {`${item.time_ago} | `}
        <StyledNavLink to={`/item/${item.id}`}>
          {` ${item.comments_count} comments`}
        </StyledNavLink>
      </Meta>
    </Container>
  );
};
