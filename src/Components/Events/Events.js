import {Navbar} from "../Common/Navbar/Navbar";
import {EventElements} from "./EventElements";
import './Events.css';
export const Events = () => {
  return (
    <div className="contentPage">
    <Navbar></Navbar>
    <div className="eventsPage">
      <p id="title">Events</p>
     <EventElements/>
    </div>
  </div>
    
  );
}