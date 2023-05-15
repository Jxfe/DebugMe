import React from 'react'
import "../Layouts/PremiumGuide/style.css"

function GuideCard({id, img, title, author}) {
/*  let averageRating = 3.5; // This should come from your data

  let stars = document.querySelectorAll('.fa-star');

  for(let i=0; i<Math.floor(averageRating); i++) {
    stars[i].classList.add('checked');
  }

  if(averageRating % 1 !== 0) {
    stars[Math.floor(averageRating)].classList.add('fa-star-half-alt');
  } */
  
  return (
    <div className="gallery" id={id}>
      <a className="_blank">
        <img src={img} width="600" height="400" />
      </a>
      <div className="desc">{title}</div>
      <div className="author">{author}</div>
      <div class="stars">
        <i class="fa fa-star" data-index="0"></i>
        <i class="fa fa-star" data-index="1"></i>
        <i class="fa fa-star" data-index="2"></i>
        <i class="fa fa-star" data-index="3"></i>
        <i class="fa fa-star" data-index="4"></i>
      </div>
    </div>
  )
}

export default GuideCard;
