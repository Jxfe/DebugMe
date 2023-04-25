import React from "react";
import Button from "../../Components/Button";
import Switch from "../../Components/Switch";

const EventInfoTwo = ({ formData, setFormData }) => {
  return (
    <div>
      <div className="event-form2">
        <img alt="Girl in a jacket" width="100" height="100" />
        <input type="file" />
        <Button content="delete" />
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
