import React, { useState } from "react";
import { CommentType } from "../stores/NewsStore";
import styled from "styled-components";
import { Divider } from "./SharedStyles";

const Container = styled.div`
  padding-left: 20px;
  padding-bottom: 10px;
  text-align: left;
  max-width: 100%;
  overflow-x: hidden;
  font-size: 12px;
`;

const CommentHeader = styled.div`
  color: #808080;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: #808080;
  cursor: pointer;
`;

export const Comment = (props: { comment: CommentType }) => {
  const comment = props.comment;
  const nestedComments = (comment.comments || []).map(comment => {
    return <Comment key={comment.id} comment={comment} />;
  });

  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <Container>
      <CommentHeader>
        <CollapseButton onClick={() => setCollapsed(!isCollapsed)}>
          [-]
        </CollapseButton>
        {comment.user}
        {` `}
        {comment.time_ago}
      </CommentHeader>
      {!isCollapsed && (
        <React.Fragment>
          <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
          <Divider />
          {nestedComments}
        </React.Fragment>
      )}
    </Container>
  );
};
