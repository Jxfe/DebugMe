import React from 'react'
import Button from './Button'

export default function Post({showing, onClose}) {
    if (!showing) return null

  return (
    <div className='post-popup-container'>
        <div className='post-contents'>
            <div className='post-body'>
                <h1>Post Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim ut tellus elementum. Luctus accumsan tortor posuere ac ut. Turpis in eu mi bibendum neque. Vulputate odio ut enim blandit volutpat maecenas. Nunc sed augue lacus viverra vitae congue eu consequat ac. Interdum varius sit amet mattis. Erat pellentesque adipiscing commodo elit. Euismod nisi porta lorem mollis aliquam ut. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Consequat ac felis donec et odio pellentesque. Elit duis tristique sollicitudin nibh sit amet commodo. Ultricies tristique nulla aliquet enim tortor at. Tempor orci dapibus ultrices in. In eu mi bibendum neque egestas congue quisque. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Leo vel orci porta non pulvinar neque laoreet suspendisse. Nullam non nisi est sit amet facilisis magna etiam. Blandit aliquam etiam erat velit scelerisque.</p>
            </div>
            
            <div className='post-comments'>
                <textarea className='comment-input' placeholder='Leave a comment'></textarea>
                <Button content="Comment"/>
            </div>    
        </div>

        <div className='post-details'>
            <div>
                <h2>Author</h2>
                <p>Author Name</p>
                <Button className={"default-button"} content="Message"/> 
            </div>
            <Button onClickEvent={onClose} content="Close"/>
        </div>        
    </div>
  )
}
