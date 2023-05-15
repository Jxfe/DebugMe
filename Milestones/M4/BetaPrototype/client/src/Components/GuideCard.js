import React from 'react'
import "../Layouts/PremiumGuide/style.css"

function GuideCard({id, img, title, author}) {
  return (
    <div className="gallery" id={id}>
      <a className="_blank">
        <img src={img} width="600" height="400" />
      </a>
      <div className="desc">{title}</div>
      <div className="author">{author}</div>
    </div>
  )
}

export default GuideCard;
