import React from "react";
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Row, Col, Container } from 'react-bootstrap';
// import "../../Clubs/Clubs.css";
import './EventElements.css';
import e_photo from "../../assets/Images/eventImage1.png";
const URLEvents = 'http://localhost:3000/events';
export const EventElements = () => {
  const [events, setEvents] = React.useState();

  React.useEffect(() => {
    getEvents();
  }, [])
  const getEvents = async () => {

    const response = await axios.get(URLEvents)
    setEvents(response.data);
    //console.log(events);
    // setSearchedEmployees(response.data)
    // console.log(response.data[response.data.length - 1].id);
    // setMaxID(response.data[response.data.length - 1].id);
  }
  const removeEvent = (id) => {
    // //functioneaza stergerea, dar se opreste serverul
    // // if(id.length!=undefined)
    // if(id instanceof Array)
    // {
    // id.forEach(id=>{console.log(id);
    // axios.delete(`${URL}/${id}`).then(res => {
    //     const del = employees.filter(employee => id !== employee.id)
    //     setEmployees(del);
    //     setSearchedEmployees(del)
    // })
    // });
    // console.log("arr");

    // }
    // else{
    //     console.log("not arr");
    //     axios.delete(`${URL}/${id}`).then(res => {
    //         const del = employees.filter(employee => id !== employee.id)
    //         setEmployees(del);
    //         setSearchedEmployees(del)
    //     })
    // }
    // window.location.reload();
  }
  const createEvent = (firstName, lastName, email, editedClubs) => {
    // console.log(firstName + " " + lastName);
    // setShowEditedClubs(editedClubs);
    // var data = {
    //     id: maxID + 1,
    //     name: firstName + " " + lastName,
    //     email: email,
    //     password: "parola",
    //     gender: "male",
    //     primary_sport_id: 0,
    //     secondary_sport_id: 0,
    //     height: 170,
    //     weight: 90,
    //     age: 25,
    //     profile_photo: " ",
    //     isAdmin: true,
    //     isCoach: false,
    //     isAthlete: false,
    //     clubs: editedClubs
    // }
    // axios.post(`${URL}`, data).then(() => {
    //     handleCloseEA();
    // })
    // window.location.reload();
    // console.log(data);

  }
  const editEvent = (id, firstName, lastName, email, editedClubs) => {
    // console.log(editedClubs);
    // axios.patch(`${URL}/${id}`, { name: firstName + " " + lastName, email: email, clubs: editedClubs }).then(() => {
    //     //window.location.reload();
    //     handleCloseEA();
    //     window.location.reload();
    // })
  }
  const contentContainer = (events) => {
    console.log(events);
    //console.log(events[0]);
    // events.map((event) => {
    //   console.log(event.name);
    //   // return (
    //   //   <Row>
    //   //     <Col >
    //   //       <Image src={e_photo}  ></Image>
    //   //       <p id="titleEvent">{event.name}</p>
    //   //       <p id="description">ADMINISTRATOR</p>
    //   //     </Col>
    //   //   </Row>
    //   // )
    // })
    return(
      <Row>
              <Col >
                <Image src={e_photo}  ></Image>
                <p id="titleEvent">{events.name}</p>
                <p id="description">ADMINISTRATOR</p>
              </Col>
              <Col >
                <Image src={e_photo}  ></Image>
                <p id="titleEvent">Connie Webb</p>
                <p id="description">ADMINISTRATOR</p>
              </Col>
            </Row>
    )
  }
  return (
    <div className="eventElement">
      <div className="eventContent">
        <Container heigth='auto'>
          {contentContainer(events)}
          {/* <Row>
            <Col >
              <Image src={e_photo}  ></Image>
              <p id="titleEvent">Connie Webb</p>
              <p id="description">ADMINISTRATOR</p>
            </Col>
            <Col >
              <Image src={e_photo}  ></Image>
              <p id="titleEvent">Connie Webb</p>
              <p id="description">ADMINISTRATOR</p>
            </Col>
          </Row>
          <Row>
            <Col >
              <Image src={e_photo}  ></Image>
              <p id="titleEvent">Connie Webb</p>
              <p id="description">ADMINISTRATOR</p>
            </Col>
            <Col >
              <Image src={e_photo}  ></Image>
              <p id="titleEvent">Connie Webb</p>
              <p id="description">ADMINISTRATOR</p>
            </Col>
          </Row> */}
        </Container>
      </div>
    </div>
  );
}