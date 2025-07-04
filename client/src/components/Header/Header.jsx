import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import { 
  BiMenuAltRight, 
  BiBell, 
  BiCalendar,
  BiHomeAlt,
  BiPlus
} from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import { useUser } from "../../context/UserDetailContext";
import { getInitials } from "../../utils/helper.js";
import axios from "axios";
import dayjs from "dayjs";

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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const dropdownRef = useRef();
  const notificationRef = useRef();
  const bookingsRef = useRef();

  // Get today's bookings
  const todayBookings = userDetails.bookings?.filter(
    (booking) => dayjs(booking.date, "DD/MM/YYYY").isSame(dayjs(), "day")
  );

  // Get upcoming bookings (next 7 days)
  const upcomingBookings = userDetails.bookings?.filter((booking) => {
    const bookingDate = dayjs(booking.date, "DD/MM/YYYY");
    return bookingDate.isAfter(dayjs(), "day") && bookingDate.diff(dayjs(), "day") <= 7;
  });

  // Fetch property details for bookings
  useEffect(() => {
    const fetchPropertyDetails = async (propertyId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/residency/${propertyId}`
        );
        setBookingDetails(prev => ({
          ...prev,
          [propertyId]: response.data
        }));
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    if (userDetails.bookings?.length > 0) {
      userDetails.bookings.forEach(booking => {
        if (!bookingDetails[booking.id]) {
          fetchPropertyDetails(booking.id);
        }
      });
    }
  }, [userDetails.bookings]);

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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (bookingsRef.current && !bookingsRef.current.contains(event.target)) {
        setBookingsOpen(false);
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

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleBookingsClick = () => {
    setBookingsOpen((prev) => !prev);
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img src="/logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            {/* View Properties Link */}
            <NavLink to="/view-property" className="menu-item">
              <BiHomeAlt size={20} />
              <span>View Properties</span>
            </NavLink>

            {/* Add Property Button */}
            <div onClick={handleAddPropertyClick} className="menu-item">
              <BiPlus size={20} />
              <span>Add Property</span>
            </div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            {user ? (
              <>
                {/* Bookings Icon with Text */}
                <div className="bookings-container" ref={bookingsRef}>
                  <div className="bookings-icon" onClick={handleBookingsClick}>
                    <div className="menu-item">
                      <BiCalendar size={20} />
                      <span>My Bookings</span>
                    </div>
                    {userDetails.bookings?.length > 0 && (
                      <span className="bookings-badge">
                        {userDetails.bookings.length}
                      </span>
                    )}
                  </div>
                  {bookingsOpen && (
                    <div className="bookings-dropdown">
                      <div className="bookings-header">
                        <h3>My Bookings</h3>
                      </div>
                      <div className="bookings-content">
                        {userDetails.bookings?.length > 0 ? (
                          userDetails.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                              <div className="booking-property-image">
                                {bookingDetails[booking.id]?.image && (
                                  <img 
                                    src={bookingDetails[booking.id].image} 
                                    alt={bookingDetails[booking.id].title || "Property"} 
                                  />
                                )}
                              </div>
                              <div className="booking-details">
                                <h3>{bookingDetails[booking.id]?.title || "Loading..."}</h3>
                                <p className="booking-address">
                                  {bookingDetails[booking.id]?.address}, {bookingDetails[booking.id]?.city}
                                </p>
                                <p className="booking-date">
                                  <BiCalendar /> Visit scheduled for {booking.date}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-bookings">
                            <p>You haven't made any bookings yet.</p>
                            <button 
                              className="button"
                              onClick={() => {
                                setBookingsOpen(false);
                                navigate("/view-property");
                              }}
                            >
                              Browse Properties
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Notification Icon */}
                <div className="notification-container" ref={notificationRef}>
                  <div className="notification-icon" onClick={handleNotificationClick}>
                    <BiBell size={20} />
                    {(todayBookings?.length > 0 || upcomingBookings?.length > 0) && (
                      <span className="notification-badge">
                        {todayBookings?.length + upcomingBookings?.length}
                      </span>
                    )}
                  </div>
                  {notificationOpen && (
                    <div className="notification-dropdown">
                      <div className="notification-header">
                        <h3>Notifications</h3>
                      </div>
                      <div className="notification-content">
                        {todayBookings?.length > 0 && (
                          <div className="notification-section">
                            <h4>Today's Visits</h4>
                            {todayBookings.map((booking) => (
                              <div key={booking.id} className="notification-item">
                                <BiBell className="notification-item-icon" />
                                <p>You have a property visit scheduled today</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {upcomingBookings?.length > 0 && (
                          <div className="notification-section">
                            <h4>Upcoming Visits</h4>
                            {upcomingBookings.map((booking) => (
                              <div key={booking.id} className="notification-item">
                                <BiBell className="notification-item-icon" />
                                <p>Upcoming visit on {booking.date}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {!todayBookings?.length && !upcomingBookings?.length && (
                          <div className="no-notifications">
                            <p>No new notifications</p>
                          </div>
                        )}
                      </div>
                      <div className="notification-footer">
                        <button onClick={() => navigate("/settings")}>
                          View All Bookings
                        </button>
                      </div>
                    </div>
                  )}
                </div>

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
              </>
            ) : (
              <button className="button login-button" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
