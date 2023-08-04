import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MobBar.module.css";
import { useAuth } from "../Context/AuthContext";

function MobBar() {
  const { dispatch: logout } = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    logout({ type: "logout" });
    localStorage.removeItem("sessionToken");
    navigate("/");
  }
  return (
    <div className={styles.menu}>
      <ul className={styles.control}>
        <li>
          <NavLink className={styles.link} to="/dashboard/search">
            <div className={styles.sideLink}>
              <span>Home</span>
            </div>
            <span style={{ color: "#5900A0" }}>&gt;</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/dashboard/songs">
            <div className={styles.sideLink}>
              <span>All Songs</span>
            </div>
            <span style={{ color: "#5900A0" }}>&gt;</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/dashboard/profile">
            <div className={styles.sideLink}>
              <span>Profile</span>
            </div>
            <span style={{ color: "#5900A0" }}>&gt;</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/mails" className={styles.link}>
            <div className={styles.sideLink}>
              <span>Mails</span>
            </div>
            <span style={{ color: "#5900A0" }}>&gt;</span>
          </NavLink>
        </li>
        <li>
          <div className={styles.link}>
            <div onClick={handleClick} className={styles.sideLink}>
              Logout
            </div>
            <span style={{ color: "#5900A0" }}>&gt;</span>
          </div>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "inherit",
          fontFamily: "Inter",
          paddingTop: "40px",
        }}
      >
        <span style={{ textAlign: "center" }}>
          <p style={{ color: "#878787" }}>All Rights Reserved</p>
          <br />
          <p style={{ color: "#5900A0" }}>
            The Pine Tree: Media & Entertainment
          </p>
          <br />
          <p style={{ color: "#878787" }}>
            Powered by: <span style={{ color: "#5900A0" }}>Quickgick</span>
          </p>
        </span>
      </div>
    </div>
  );
}

export default MobBar;
