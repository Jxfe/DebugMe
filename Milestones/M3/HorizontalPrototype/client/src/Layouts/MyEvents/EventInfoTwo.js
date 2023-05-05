import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Button from "../../Components/Button";
import Switch from "../../Components/Switch";

const EventInfoTwo = ({ formData, setFormData }) => {
  const inputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteBtnEnabled, setDeleteBtnEnabled] = useState(true);

  useEffect(() => {
    if (!formData.image) return;

    let tmp = [];
    for (let i = 0; i < formData.image.length; i++) {
      tmp.push(URL.createObjectURL(formData.image[i]));
    }
    const objectUrls = tmp;
    setPreviewImage(objectUrls);
    setDeleteBtnEnabled(false);
    inputRef.current.files = formData.image;

    return () => {
      URL.revokeObjectURL(objectUrls);
    };
  }, [formData.image]);

  const deleteImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewImage(null);
    setDeleteBtnEnabled(true);
    inputRef.current.value = "";
  };

  return (
    <div>
      <div className="event-form2">
        <img
          className="form-image"
          defaultValue={""}
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
            required
            onChange={(event) => {
              console.log(event.target.value);
              if (event.target.files && event.target.files.length > 0) {
                setFormData({
                  ...formData,
                  image: event.target.files,
                  imageName: event.target.value
                });
              }
            }}
          />
          <Button
            content="Delete Image"
            isDisabled={deleteBtnEnabled}
            onClickEvent={deleteImage}
          />
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
