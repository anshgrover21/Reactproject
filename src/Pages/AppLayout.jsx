import { NavLink, Outlet, useNavigate } from "react-router-dom";

import styles from "./AppLayout.module.css";
import Sidebar from "../Component/Sidebar";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import Player from "../Component/Player";
import { useSong } from "../Context/SongContext";
import { MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import MobBar from "../UI/MobBar";

function AppLayout() {
  const { user, dispatch: logout } = useAuth();
  const { song, songList, dispatch } = useSong();
  const [open, setOpen] = useState(false);
  const [isMobile, setisMobile] = useState(window.innerWidth < 600);
  const [log, setLog] = useState(false);
  const [ham, setHam] = useState(true);
  const navigate = useNavigate();
  console.log(setisMobile);

  useEffect(() => {
    if (user?.endDate) {
      const endDate = new Date(user.endDate); // Convert to Date object
      const today = new Date();
      const differenceInMilliseconds = endDate - today;
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      console.log(differenceInMilliseconds, differenceInDays);
      if (differenceInDays <= 30) {
        setOpen(true);
      }
    }
  }, [user]);

  function handleClick() {
    logout({ type: "logout" });
    localStorage.removeItem("sessionToken");
    navigate("/");
  }

  return isMobile === false ? (
    <div className={styles.app}>
      <div onClick={() => setLog((log) => !log)} className={styles.user}>
        <FaUser></FaUser>
      </div>
      {log && (
        <div className={styles.logout}>
          {user?.isAdmin && (
            <>
              <NavLink to="/admin" className={styles.admin}>
                Admin
              </NavLink>
            </>
          )}
          <div onClick={handleClick} className={styles.logbtn}>
            Logout
          </div>
        </div>
      )}
      {open && (
        <div className={styles.reminder}>
          Welcome {user?.email}. Reminder your subscription ends on{" "}
          {user?.endDate}
          <button className={styles.btn} onClick={() => setOpen(false)}>
            <MdClose></MdClose>
          </button>
        </div>
      )}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <Outlet></Outlet>
      {song && (
        <div className={styles.Player}>
          <Player dispatch={dispatch} song={song} songList={songList} />
        </div>
      )}
    </div>
  ) : (
    <>
      <MobileDash ham={ham} setHam={setHam} />
      {ham === true && <Outlet></Outlet>}
      {song && (
        <div className={styles.Player}>
          <Player dispatch={dispatch} song={song} songList={songList} />
        </div>
      )}
    </>
  );
}

export default AppLayout;

function MobileDash({ ham, setHam }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (user?.endDate) {
      const endDate = new Date(user.endDate); // Convert to Date object
      const today = new Date();
      const differenceInMilliseconds = endDate - today;
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      console.log(differenceInMilliseconds, differenceInDays);
      if (differenceInDays <= 30) {
        setOpen(true);
      }
    }
  }, [user]);

  return (
    <div className={styles.mob}>
      {open && (
        <div className={styles.mobreminder}>
          <span>Reminder your subscription ends on {user?.endDate}</span>
          <button className={styles.mobclose} onClick={() => setOpen(false)}>
            <MdClose></MdClose>
          </button>
        </div>
      )}
      <div className={styles.mobheader}>
        <span>Dashboard</span>
        {ham ? (
          <HiMenu onClick={() => setHam(!ham)}></HiMenu>
        ) : (
          <MdClose onClick={() => setHam(!ham)}></MdClose>
        )}
      </div>
      {ham === false && <MobBar></MobBar>}
    </div>
  );
}
