import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Button from "../../Components/Button";
import Switch from "../../Components/Switch";

const EventInfoTwo = ({ formData, setFormData }) => {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!file) return;

    let tmp = [];
    for (let i = 0; i < file.length; i++) {
      tmp.push(URL.createObjectURL(file[i]));
    }
    const objectUrls = tmp;
    setPreviewImage(objectUrls);

    return () => {
      URL.revokeObjectURL(objectUrls);
    };
  }, [file]);

  const deleteImage = () => {
    setPreviewImage(null);
    inputRef.current.value = "";
  };

  return (
    <div>
      <div className="event-form2">
        <img
          className="form-image"
          src={previewImage ? previewImage : ""}
          alt="Event Flyer"
          width="100"
          height="100"
        />
        <div className="image-btns">
          <input
            ref={inputRef}
            className="form-image-input"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={(event) => {
              console.log(event.target.files[0]);
              console.log(event.target.files);
              if (event.target.files && event.target.files.length > 0) {
                setFile(event.target.files);
              }
            }}
          />
          <Button content="Delete Image" onClickEvent={deleteImage} />
        </div>
      </div>
      <div className="members-only-block">
        <label>Members Only:</label>
        <Switch
          rounded={true}
          isToggled={formData.membersOnly}
          onToggle={() => {
            setFormData({ ...formData, membersOnly: !formData.membersOnly });
          }}
        />
      </div>
    </div>
  );
};

export default EventInfoTwo;
