import React, { useState, useEffect } from "react";
import { Rating, Stack } from "@mui/material";
import "../Layouts/PremiumGuide/style.css";

function GuideCard({ id, img, title, author, rating }) {
  return (
    <div className="gallery">
      <img src={img} width="100%" height="400" />
      <div className="desc">{title}</div>
      <div className="author">{author}</div>

      <Stack dir="ltr" spacing={2}>
        <Rating size="large" value={rating} readOnly />
      </Stack>
    </div>
  );
}

export default GuideCard;
