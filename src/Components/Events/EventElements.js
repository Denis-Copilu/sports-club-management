import React from "react";
import Image from 'react-bootstrap/Image';
// import { DateTime } from 'react-datetime-bootstrap';
import './EventElements.css';
import e_photo from "../../assets/Images/eventImage1.png";

export const EventElements = (eventsList) => {
  console.log(eventsList.nameEvent);
  
  return (
    <div className="eventElement">
      <div className="eventContent">
        <Image src={e_photo}  ></Image>
        <div className="contentEvent">
          <p id="titleEvent" >{eventsList.nameEvent}</p>
          <p id="description">{eventsList.descriptionEvent}</p>
          <div><div id="date-icon"></div>{eventsList.dateEvent} <div id="time-icon"></div>{eventsList.timeEvent}</div>
          <div><div id="location-icon"></div>{eventsList.locationEvent}</div>
          <div id="participantsText">PARTICIPANTS</div>
        </div>
      </div>
    </div>
  );
}