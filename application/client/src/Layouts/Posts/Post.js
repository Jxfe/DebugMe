import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "../../Components/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";
import useAuth from "../../Hooks/useAuth";
import "./style.css";
import LikeButton from "../../Components/LikeButton";
import UserProfile from "../../Components/UserProfile";

function Post() {
  const [profileShowing, setProfileShowing] = useState(false);
  const [profileContents, setProfileContents] = useState({});
  const [postContents, setPostContents] = useState({});
  const [newComment, setNewComment] = useState("");
  const [isLiked, setLiked] = useState(false);
  const { auth } = useAuth();
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getPostContents();
  }, []);

  useEffect(() => {
    checkPostLike();
  }, [postContents]);

  function showProfile(userID, profilePic, username, bio, onClose) {
    setProfileContents({
      userID: userID,
      profilePic: profilePic,
      username: username,
      bio: bio,
      onClose: onClose
    });

    setProfileShowing(true);
  }
  function hideProfile() {
    setProfileShowing(false);
  }

  const getPostContents = async () => {
    const url = `/api/getpost?id=${id}`;
    const response = await customAxios(url);
    setPostContents(response?.data);
  };

  const updateLikeStatus = async (likeStatus) => {
    let url = "";
    likeStatus ? (url = "/api/dislikepost") : (url = "/api/likepost");

    await customAxios({
      method: "post",
      url: url,
      data: {
        post_id: id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };

  const deletePost = async () => {
    await customAxios({
      method: "delete",
      url: "/api/deletepost",
      data: {
        id: id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      navigator("/posts");
      window.location.reload();
    });
  };

  const renderComments = () => {
    return postContents?.replies?.map((item, index) => {
      return (
        <div key={index} id={index} className="comment-container">
          <p className="comment-author">
            <Link
              to="#"
              onClick={() => {
                showProfile(
                  item?.author?.id,
                  "",
                  item?.author?.name,
                  `${item?.author?.name}'s Bio goes here.`,
                  hideProfile
                );
              }}
            >
              {item.author?.name}
            </Link>
          </p>
          <p>{moment.utc(item?.created_at).fromNow()}</p>
          <p className="comment-content">{item?.content}</p>
        </div>
      );
    });
  };

  const checkPostLike = () => {
    const user = postContents?.likes?.filter(
      (user) => user.author.email === auth?.email
    );

    if (user?.length > 0) {
      setLiked(true);
    }
    return isLiked;
  };

  const handleSubmit = async () => {
    await customAxios({
      method: "post",
      url: "/api/addcomment",
      data: {
        post_id: id,
        content: newComment
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };

  return (
    <div className="post-display-container">
      <div className="post-left">
        <div className="post-header">
          <div>
            <h1>{postContents?.title}</h1>
            <Link
              to="#"
              onClick={() => {
                showProfile(
                  postContents?.author?.id,
                  "",
                  postContents?.author?.name,
                  `${postContents?.author?.name}'s Bio goes here.`,
                  hideProfile
                );
              }}
            >
              {postContents?.author?.name}
            </Link>
            <br />
            <span>
              {`Date: ${moment(postContents?.created_at).format(
                "MMM Do, YYYY"
              )}`}
            </span>
          </div>
        </div>

        <p>{postContents?.content}</p>
        <div className="likeBtn-container">
          {postContents?.author?.id != auth?.userID ? (
            ""
          ) : (
            <Button
              content="Delete Post"
              className="delete-btn"
              onClickEvent={deletePost}
            />
          )}
          <LikeButton
            isLiked={isLiked}
            content="Like"
            icon="Hand"
            callBack={updateLikeStatus}
          />
        </div>
      </div>

      <div className="post-right">
        <div className="post-comments-container">
          {postContents?.replies?.length > 0 ? (
            renderComments()
          ) : (
            <p>No comments</p>
          )}
        </div>
        <div className="new-comment-container">
          <form onSubmit={handleSubmit}>
            <textarea
              className="new-comment-textarea"
              type="text"
              name="newComment"
              id="newComment"
              placeholder="Leave a new comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <Button className="default-button" content="Submit" />
          </form>
        </div>
      </div>
      {profileShowing && <UserProfile profileContents={profileContents} />}
    </div>
  );
}

export default Post;
