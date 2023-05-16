import React from 'react';

import Button from './Button';

import "./style.css";

export default function UserProfile({id, profilePic, name, bio, onClose}) {
  return (
    <div>
      <div className='profile-container'>
        <div className='user-info'>
            <div className='picture-container'>
                <img src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38=" 
                className='profile-img' />
            </div>
            <div className='username-bio'>
                <h1>Username</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Pretium viverra suspendisse potenti nullam ac tortor vitae. </p>
            </div>
        </div>

        <div className='profile-buttons'>
            <Button 
                className={'default-button'}
                content="Message"
            />
            <Button 
                className={'outline-button'}
                content="Close"
                onClickEvent={onClose}
            />
        </div>
      </div>
    </div>
  )
}
