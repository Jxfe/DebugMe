import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

function PostDescription({ title, author, date, onClickEvent }) {
  return (
    <div className="post-description" onClick={onClickEvent}>
      <p>{title}</p>
      <p>
        {author}
        <span className="post-date">{date}</span>
      </p>
    </div>
  );
}

export default PostDescription;
