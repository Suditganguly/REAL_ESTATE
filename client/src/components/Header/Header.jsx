// import React, { useState } from "react";
// import "./Header.css";
// import { BiMenuAltRight } from "react-icons/bi";
// import { getMenuStyles } from "../../utils/common";
// import useHeaderColor from "../../hooks/useHeaderColor";
// import OutsideClickHandler from "react-outside-click-handler";
// import { Link, NavLink } from "react-router-dom";
// // import { useAuth0 } from "@auth0/auth0-react";
// import ProfileMenu from "../ProfileMenu/ProfileMenu";
// import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
// // import useAuthCheck from "../../hooks/useAuthCheck.jsx";


// const Header = () => {
//   const [menuOpened, setMenuOpened] = useState(false);
//   const headerColor = useHeaderColor();
//   const [modalOpened, setModalOpened] = useState(false);
//   const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
//   const { validateLogin } = useAuthCheck();


//   const handleAddPropertyClick = () => {
//     if (validateLogin()) {
//       setModalOpened(true);
//     }
//   };
//   return (
//     <section className="h-wrapper" style={{ background: headerColor }}>
//       <div className="flexCenter innerWidth paddings h-container"> {/*from index.css we usinging the classes*/}
//         {/* logo */}
//         <Link to="/">
//           <img src="./logo.png" alt="logo" width={100} /> {/*logo of the website*/}
//         </Link>

//         {/* menu */}
//         <OutsideClickHandler
//           onOutsideClick={() => {
//             setMenuOpened(false);
//           }}
//         >
//           <div
//             // ref={menuRef}
//             className="flexCenter h-menu" 
//             style={getMenuStyles(menuOpened)}
//           > {/*gap between the headers*/}
//             <NavLink to="/properties">Properties</NavLink>

//             <a href="mailto:suditganguly@gmail.com">Contact</a>

//             {/* add property */}
//             <div onClick={handleAddPropertyClick}>Add Property</div>
//             <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
//             {/* login button */}
//             {!isAuthenticated ? (
//               <button className="button" onClick={loginWithRedirect}>
//                 Login
//               </button>
//             ) : (
//               <ProfileMenu user={user} logout={logout} />
//             )}
//           </div>
//         </OutsideClickHandler>

//         {/* for medium and small screens */}
//         <div
//           className="menu-icon"
//           onClick={() => setMenuOpened((prev) => !prev)}
//         >
//           <BiMenuAltRight size={30} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Header;

import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const navigate = useNavigate();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  const handleLoginClick = () => {
    navigate("/register"); // redirect to your custom registration page
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:suditganguly@gmail.com">Contact</a>
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            <button className="button" onClick={handleLoginClick}>
              Login
            </button>
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
