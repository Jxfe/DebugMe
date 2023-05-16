import React, { useState, useEffect } from "react"; 
import "../Layouts/PremiumGuide/style.css"

function GuideCard({id, img, title, author, rating}) {
  
  useEffect(() => {
    // setCheckedStars();
  }, []);

  const setCheckedStars = () => {
    // let stars = document.querySelectorAll('.fa-star');

    let starsDiv = document.getElementById(`${id}`);
    let stars = starsDiv.children;

    for(let i=0; i < rating; i++) {
      stars[i].classList.add('checked');
    }
  }
  
  return (
    <div className="gallery">
      <a className="_blank">
        <img src={img} width="600" height="400" />
        <div className="desc">{title}</div>
        <div className="author">{author}</div>
      </a>
      
      <div className="stars" id={id}>
        <i className="fa fa-star" data-index="0"></i>
        <i className="fa fa-star" data-index="1"></i>
        <i className="fa fa-star" data-index="2"></i>
        <i className="fa fa-star" data-index="3"></i>
        <i className="fa fa-star" data-index="4"></i>
      </div>
    </div>
  )
}

export default GuideCard;
