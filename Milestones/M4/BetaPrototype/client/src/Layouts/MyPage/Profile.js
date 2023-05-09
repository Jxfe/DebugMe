import React, { useState } from "react"; // Needed for AWS since it's using node 16

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <div className="mypage-profile">
        <p className="personalinfo-field-head">Name</p>
        <p>Jose Ortiz</p>
      </div>
      <div>
        <p className="personalinfo-field-head">Email</p>
        <p>joseo@sfsu.edu</p>
      </div>
      <div>
        <p className="personalinfo-field-head">Subscription Plan</p>
        <p>Free</p>
      </div>
    </div>
  );
}

export default Profile;
