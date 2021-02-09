import { Navbar } from "../Common/Navbar/Navbar";
import { EventElements } from "./EventElements";
import { Container } from 'react-bootstrap';
import React from "react";
import axios from 'axios';
import './Events.css';
const URLEvents = 'http://localhost:3000/events';
export const Events = () => {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    getEvents();
  }, [])
  const getEvents = async () => {
    const response = await axios.get(URLEvents);
    setEvents(response.data);
    // setNameEvent(events[0].name);
    // setDescriptionEvent(events[0].description);
  }
  return (
    <div className="contentPage">
      <Navbar></Navbar>
      <div className="eventsPage">
        <p id="title">Events</p>
        <div id="btn-input">
          <input id="searchInput" ></input>
          <button id='btnAdd1' >Add new</button>
        </div>
        <div id="btnEvents">
        <button className="btnTypeEvents" >Ongoing</button>
        <button className='btnTypeEvents' >Future</button>
        <button className='btnTypeEvents' >Past</button>
        </div>
        <div className="eventsList">
          {
            events && events.map((event, index) => {
              return (
                <div key={index}>
                  <Container>
                    <EventElements nameEvent={event.name} descriptionEvent={event.description} dateEvent={event.date} timeEvent={event.time} locationEvent={event.location} />
                  </Container>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

  );
}