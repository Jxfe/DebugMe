import React from "react";
import CommentIcon from "@mui/icons-material/Comment"; // Needed for AWS since it's using node 16
import "./style.css";

function PostDescription({ title, author, date, commentCount, onClickEvent }) {
  return (
    <div className="post-description" onClick={onClickEvent}>
      <div className="post-info">
        <span className="post-info-span">{title}</span>
        <span>{`By ${author}`}</span>
      </div>

      <div className="post-stats">
        <span>
          <CommentIcon />
          <span className="post-count">{commentCount}</span>
        </span>
        <span>
          <span className="post-date">{date}</span>
        </span>
      </div>
    </div>
  );
}

export default PostDescription;
