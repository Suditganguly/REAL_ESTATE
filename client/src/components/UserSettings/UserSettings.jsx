import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserDetailContext";
import { toast } from "react-toastify";
import "./UserSettings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BiArrowBack,
  BiUpload,
  BiLock,
  BiTrash,
  BiSave,
  BiX,
  BiUser,
  BiShield,
} from "react-icons/bi";

const UserSettings = () => {
  const { userDetails, setUserDetails } = useUser();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Store original data when component mounts
    setOriginalData({
      image: userDetails.user?.image || null,
      password: null,
    });
  }, [userDetails.user]);

  // Check for changes
  useEffect(() => {
    const hasPasswordChanges = Object.values(passwordData).some(
      (value) => value !== ""
    );
    const hasImageChanges = profileImage !== null;

    setHasChanges(hasPasswordChanges || hasImageChanges);
  }, [passwordData, profileImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("image", profileImage);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API}/upload-profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update user details with the new image URL
      const imageUrl =
        response.data.image || response.data.imageUrl || response.data.url;

      setUserDetails((prev) => ({
        ...prev,
        user: { ...prev.user, profilePic: imageUrl },
      }));

      // Clean up the preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      setProfileImage(null);
      setHasChanges(false);
      toast.success("Profile image updated successfully");

      // Refresh user data to ensure we have the latest image URL
      const userResponse = await axios.get(
        `${import.meta.env.VITE_USER_API}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (userResponse.data.user) {
        setUserDetails((prev) => ({
          ...prev,
          user: userResponse.data.user,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_USER_API}/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setHasChanges(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_USER_API}/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUserDetails({
        user: null,
        token: null,
        bookings: [],
      });

      toast.success("Account deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (hasChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmed) return;
    }
    navigate(-1);
  };

  const handleDiscardChanges = () => {
    const confirmed = window.confirm(
      "Are you sure you want to discard all changes?"
    );
    if (!confirmed) return;

    // Reset all changes
    setProfileImage(null);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setHasChanges(false);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Handle image upload if there's a new image
      if (profileImage) {
        await handleImageUpload();
      }

      // Handle password change if password fields are filled
      if (Object.values(passwordData).some((value) => value !== "")) {
        await handlePasswordChange();
      }

      setHasChanges(false);
      toast.success("All changes saved successfully");
    } catch (error) {
      toast.error("Error saving changes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your profile picture?"
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_USER_API}/delete-profile-image`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserDetails((prev) => ({
        ...prev,
        user: { ...prev.user, profilePic: null },
      }));

      toast.success("Profile picture removed successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error removing profile picture"
      );
    } finally {
      setLoading(false);
    }
  };

  // Add this function to generate initials
  const getInitials = () => {
    const name = userDetails.user?.fullName || "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!userDetails.user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <button onClick={handleBack} className="back-button" title="Go back">
            <BiArrowBack />
          </button>
          <h1>Account Settings</h1>
        </div>

        <div className="settings-grid">
          {/* Profile Section */}
          <div className="settings-card profile-section">
            <div className="card-header">
              <BiUser className="section-icon" />
              <h2>Profile Picture</h2>
            </div>
            <div className="profile-image-section">
              <div className="profile-image-wrapper">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : userDetails.user?.profilePic ? (
                  <img
                    src={userDetails.user.profilePic}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="initials-placeholder">{getInitials()}</div>
                )}
                {userDetails.user?.profilePic && !imagePreview && (
                  <button
                    className="delete-image-button"
                    onClick={handleDeleteImage}
                    disabled={loading}
                    title="Remove profile picture"
                  >
                    <BiX />
                  </button>
                )}
              </div>
              <div className="image-upload-controls">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="profile-image-input"
                  className="hidden-input"
                />
                <label htmlFor="profile-image-input" className="upload-button">
                  <BiUpload /> Choose New Image
                </label>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="settings-card password-section">
            <div className="card-header">
              <BiShield className="section-icon" />
              <h2>Security</h2>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="password-form"
            >
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                />
              </div>
            </form>
          </div>

          {/* Danger Zone Section */}
          <div className="settings-card danger-zone">
            <div className="card-header">
              <BiTrash className="section-icon" />
              <h2>Danger Zone</h2>
            </div>
            <div className="danger-zone-content">
              <p className="warning-text">
                Warning: Deleting your account is permanent. All your data will
                be lost forever.
              </p>
              <button
                className="delete-account-button"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                <BiTrash /> Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        {hasChanges && (
          <div className="floating-action-bar">
            <div className="action-bar-content">
              <button
                className="discard-button"
                onClick={handleDiscardChanges}
                disabled={loading}
              >
                <BiX /> Discard
              </button>
              <button
                className="save-button"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                <BiSave /> Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
