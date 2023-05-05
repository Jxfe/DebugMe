import React, { useState, useEffect } from "react";
import Button from "../../Components/Button";
import Switch from "../../Components/Switch";

const EventInfoTwo = ({ formData, setFormData }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    return () => {
      URL.revokeObjectURL(previewImage);
    };
  }, [file]);

  return (
    <div>
      <div className="event-form2">
        <img
          className="form-image"
          alt="Event Flyer"
          width="100"
          height="100"
        />
        <div className="image-btns">
          <input className="form-image-input" type="file" />
          <Button content="delete" />
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
