import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth);
    alert("Logged out!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.displayName || "No name set"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>You’re not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
