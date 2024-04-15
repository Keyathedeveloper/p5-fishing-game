import React from "react";
import axios from "axios";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post("/logout");

      // Clear the authentication token from local storage
      localStorage.removeItem("access_token");

      // Refresh the page to clear the user session
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
