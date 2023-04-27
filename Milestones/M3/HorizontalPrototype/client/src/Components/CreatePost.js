import React from 'react';
import Button from './Button';
import "./style.css";

export default function CreatePost({showing, onClose}) {
    if (!showing) return null

  return (
    <div className='post-popup-container'>
        <div className='create-post-info'>
            <h2>Write your new post</h2>
            <input placeholder='Post Title'></input>
            <textarea placeholder='What do you want to share?'></textarea>
        </div>

        <div className='create-post-utils'>
            <div>
                <p>Add Images</p>
                <Button className={"default-button"} content="Select"/> 
            </div>
            <div>
                <Button className="default-button" onClickEvent={onClose} content="Submit"/>
                <Button onClickEvent={onClose} content="Cancel"/>
            </div>
        </div>        
    </div>
  )
}
