import React from "react";

const UserProfile = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        User Profile
        <span> {params.id}</span>
      </h1>
    </div>
  );
};

export default UserProfile;
