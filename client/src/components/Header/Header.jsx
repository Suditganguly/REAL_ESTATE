import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import { useUser } from "../../context/UserDetailContext";
import { getInitials } from "../../utils/helper.js";
import axios from "axios";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const navigate = useNavigate();

  // Destructure userDetails and setUserDetails
  const { userDetails, setUserDetails } = useUser();
  const user = userDetails.user; // Extract user for easier use

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Refresh user profile if needed
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_USER_API}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Update the entire userDetails object (preserving bookings if needed)
        setUserDetails((prev) => ({
          ...prev,
          user: res.data.user,
        }));
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    if (token && !user) fetchUser();
  }, [user, setUserDetails]);

  // Dropdown close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  const handleLoginClick = () => navigate("/login");

  const handleProfileClick = () => setDropdownOpen((prev) => !prev);

  const handleSettingsClick = () => {
    setDropdownOpen(false);
    navigate("/settings");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear userDetails properly on logout
    setUserDetails({
      user: null,
      token: null,
      bookings: [],
    });
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img src="/logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            {/* <a href="mailto:suditganguly@gmail.com">Contact</a> */}
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            {user ? (
              <div className="profile-container" ref={dropdownRef}>
                <div className="profile-avatar" onClick={handleProfileClick}>
                  {user.profilePic && user.profilePic !== "default-profile.png" ? (
                    <img
                      src={user.profilePic}
                      alt="User"
                      className="user-avatar"
                    />
                  ) : (
                    <div className="avatar-initials" title={user.fullName}>
                      {getInitials(user.fullName)}
                    </div>
                  )}
                </div>
                {dropdownOpen && (
                  <div className="profile-dropdown">
                    <div
                      className="dropdown-item"
                      onClick={handleSettingsClick}
                    >
                      Settings
                    </div>
                    <div className="dropdown-item" onClick={handleLogoutClick}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="button" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
