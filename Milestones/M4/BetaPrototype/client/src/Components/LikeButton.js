/**
 * From Upbeat code
 * https://www.upbeatcode.com/react/how-to-implement-a-like-button-in-react/
 */

import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "../resources/hand.svg";

import "./likeButton.scss";

const particleList = Array.from(Array(10));

const LikeButton = ({ isLiked, callBack }) => {
  const [liked, setLiked] = useState(isLiked);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setLiked(() => isLiked);
  }, [isLiked]);

  return (
    <>
      <button
        onClick={() => {
          callBack(liked);
          setLiked(!liked);
          setClicked(true);
        }}
        onAnimationEnd={() => setClicked(false)}
        className={cn("like-button-wrapper", {
          liked,
          clicked
        })}
      >
        {liked && (
          <div className="particles">
            {particleList.map((_, index) => (
              <div
                key={index}
                className="particle-rotate"
                style={{
                  transform: `rotate(${
                    (360 / particleList.length) * index + 1
                  }deg)`
                }}
              >
                <div className="particle-tick" />
              </div>
            ))}
          </div>
        )}
        <div className="like-button">
          <Hand />
          <span>Like</span>
          <span className={cn("suffix", { liked })}>d</span>
        </div>
      </button>
    </>
  );
};

export default LikeButton;
