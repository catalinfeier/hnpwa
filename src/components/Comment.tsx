import React from "react";
import { CommentType } from "../stores/NewsStore";

export const Comment = (props: { comment: CommentType }) => {
  const comment = props.comment;
  const nestedComments = (comment.comments || []).map(comment => {
    return <Comment comment={comment} />;
  });
  console.log("comment", comment.content);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
      {comment.user}
      {comment.comments.length}
      {nestedComments}
      <br />
    </div>
  );
};
