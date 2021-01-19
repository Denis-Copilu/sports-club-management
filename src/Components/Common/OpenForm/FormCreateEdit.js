import axios from 'axios';
import { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import {Dropdown} from 'semantic-ui-react';
import './FormCreateEdit.css';
export const FormCreateEdit = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    //   const handleShow = () => setShow(true);  
    const countryOptions = [
        { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
        { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
        
      ]   
    return (
        <>

            <Form>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">First Name</Form.Label>
                    <Form.Control onChange={(e) => { }} type="text" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Last Name</Form.Label>
                    <Form.Control onChange={(e) => { }} type="text" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Email Adress</Form.Label>
                    <Form.Control onChange={(e) => { }} type="text" placeholder="Enter email adress" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Club Assign</Form.Label>
                    <Form.Control onChange={(e) => { }} type="text" placeholder="Enter club assign" />
                    {/* <Dropdown id="drpDownClub" options={options} onChange={defaultOption} value={defaultOption} placeholder="Select an option" />; */}
                    {/* <Dropdown placeholder='State' search selection options={countryOptions} /> */}
                    {/* <Dropdown>
                    <Dropdown.Toggle id="drpDownClub">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown> */}
                    {/* <Form.Control onChange={(e) => { }} type="text" placeholder="Enter club assign" /> */}
                </Form.Group>

            </Form>

        </>
    );
}
