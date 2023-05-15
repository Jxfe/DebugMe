import React from "react"; // Needed for AWS since it's using node 16
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./style.css";

function PostDescription({
  title,
  author,
  date,
  commentCount,
  likes,
  onClickEvent
}) {
  return (
    <div className="post-description" onClick={onClickEvent}>
      <div className="post-info">
        <span className="post-info-span">{title}</span>
        <span>{`By ${author}`}</span>
      </div>

      <div className="post-stats">
        <span>
          <ThumbUpIcon />
          <span className="post-likes">{likes}</span>
          <CommentIcon />
          <span className="post-count">{commentCount}</span>
        </span>
        <span>
          <span>{date}</span>
        </span>
      </div>
    </div>
  );
}

export default PostDescription;
