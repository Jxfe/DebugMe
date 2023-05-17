import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import { customAxios } from "../../utils/customAxios";

function CreateGuide() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  
  const gotoPremiumGuide = () => {
    navigate("/premiumguides");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 6 * 1024 * 1024; // 6 MB in bytes
  
    // If file size is greater than the max size, alert the user and do not set the file
    if (file.size > maxSize) {
      alert('File size exceeds 6MB. Please select another image.');
      return;
    }
  
    // If file size is valid, set the file
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('image_path', image);

    try {
      const response = await customAxios({
        method: 'POST',
        url: '/api/guides',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Successfully created guide
        gotoPremiumGuide();
      }
    } catch (error) {
      console.error('Error creating guide:', error);
    }
  };

  return (
    <div>
      <h3>Premium Guides</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="4" cols="50" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="imageUpload">Upload an image:</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <Button
            className="default-button"
            content="Submit"
            onClickEvent={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateGuide;
