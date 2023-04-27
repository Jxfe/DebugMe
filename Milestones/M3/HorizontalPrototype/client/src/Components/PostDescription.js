import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

function PostDescription({id, title, author, onClickEvent}) {
  return (
    
    <div className="post-description" onClick={onClickEvent}>
        <p>{id}</p>
        <p>{title}</p>
        <p>{author}</p>
     </div>
    
  );
}

export default PostDescription;