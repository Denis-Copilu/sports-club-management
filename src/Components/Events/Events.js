import { Navbar } from "../Common/Navbar/Navbar";
import { EventElements } from "./EventElements";
import { Container, Modal } from 'react-bootstrap';
import React, { Fragment } from "react";
import axios from 'axios';
import { FormCreateEditEvent } from './FormCreateEditEvent';
import './Events.css';
import Pagination from '../Common/Pagination/Pagination';
const URLEvents = 'http://localhost:3000/events';
export const Events = () => {
  const [events, setEvents] = React.useState([]);
  const [searchedEvents, setSearchedEvents] = React.useState([]);
  const [eventToEdit, setEventToEdit] = React.useState({});
  const [showEA, setShowEA] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(2);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = searchedEvents.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  React.useEffect(() => {
    getEvents();
  }, [])

  const getEvents = async () => {
    const response = await axios.get(URLEvents);
    setEvents(response.data);
    setSearchedEvents(response.data);
  }

  const search = (e) => {
    const searchedWord = e.target.value;
    if (!searchedWord.length > 0) {
      setSearchedEvents(events);
    } else {
      let searched = searchedEvents.filter(event => event.name.toLowerCase().includes(searchedWord.toLowerCase()));
      setSearchedEvents(searched);
    }
  }

  const handleShowEA = (type, event = {}) => {
    setTitle(type + " Event");
    setShowEA(true);
    if (event) {
      setEventToEdit(event);
    }
  }

  const handleCloseEA = () => {
    setShowEA(false);
  }

  return (
    <div className="contentPage">
      <Navbar></Navbar>
      <div className="eventsPage">
        <p id="title">Events</p>
        <div id="btn-input">
          <input id="searchInput" onChange={(e) => { search(e) }}></input>
          <button id='btnAdd1' onClick={() => { handleShowEA("Add"); setType("add"); }} >Add new</button>
        </div>
        <div id="btnEvents">
          {/* <button className="btnTypeEvents" >Ongoing</button>
          <button className='btnTypeEvents' >Future</button>
          <button className='btnTypeEvents' >Past</button> */}
        </div>
        <div className="eventsList">
          {
            currentPost && currentPost.map((event, index) => {
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={searchedEvents.length}
          paginate={paginate}
        />
      </div>
      <Fragment>
        <Modal show={showEA} onHide={handleCloseEA} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title id="lblTitle">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormCreateEditEvent formType={type} handleCloseEA={handleCloseEA}></FormCreateEditEvent>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </div>
  );
}