import React from "react";
import Image from 'react-bootstrap/Image';
import "../../Clubs/Clubs.css";
import "./navbar.css";
import p_photo from "../../../assets/Images/avatar.png";
export const Navbar = () => {
  return (
    <div className="navBar">
      <div className="navBarControls">
        <div className="userContent">
          <Image src={p_photo} roundedCircle ></Image>
          <p id="name">{localStorage.username}</p>
          <p id="role">ADMINISTRATOR</p>
        </div>
        <div className="buttonsControl">
          <div id="dst"><a href="/coaches"><i id="coaches-icon"></i> &nbsp; &nbsp; Coaches</a></div>
          <div id="dst"><a href="/events"><i id="events-icon"></i> &nbsp; &nbsp;  Events &nbsp; &nbsp;</a></div>
          <div id="dst"><a href="/clubs"><i id="clubs-icon"></i> &nbsp; &nbsp;  Clubs &nbsp; &nbsp; &nbsp; </a></div>
          <div id="dst"><a href="/athletes"><i id="athletes-icon"></i> &nbsp; &nbsp; Athletes</a></div>
        </div>
        <button id="logoutBtn" onClick={() => { localStorage.removeItem('isLoggedIn'); window.location.reload() }}><i id="logout-icon"></i>LOGOUT</button>
      </div>
    </div>
  );
}