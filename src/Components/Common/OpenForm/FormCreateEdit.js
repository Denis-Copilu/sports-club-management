import axios from 'axios';
import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';

import './FormCreateEdit.css';
const URL = 'http://localhost:3000/clubs';
export const FormCreateEdit = ({ employee, formType, handleCloseEA, editData, clubs}) => {
    console.log(employee)
    let firstName = formType.toLowerCase() === 'edit' ? employee.name.split(' ')[0] : '';
    let lastName = formType.toLowerCase() === 'edit' && employee.name.split(' ')[1] ? employee.name.split(' ')[1] : ''; 
    let { email, clubs_ } = employee;
    const stateDropdown = (club, employee)=>{
        //Mai trebuie sa lucrez la aceasta functie
        // if( club === employee.clubs[2])
        //     return 'true';
        // else
        //     return 'false';
    }
    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">First Name</Form.Label>
                    <Form.Control defaultValue={firstName} onKeyUp={(e)=>{firstName=e.target.value}} type="text" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Last Name</Form.Label>
                    <Form.Control defaultValue={lastName} onKeyUp={(e)=>{lastName=e.target.value}} type="text" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Email Adress</Form.Label>
                    <Form.Control defaultValue={email} onKeyUp={(e)=>{email=e.target.value}} type="text" placeholder="Enter email adress" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Club Assign</Form.Label>
                    {/* <Form.Control defaultValue={clubs} onKeyUp={(e)=>{clubs=e.target.value}} type="text" placeholder="Enter club assign" /> */}
                    { 
                    <div>
                        <select name='clubs' className="browser-default custom-select" multiple>
                        {clubs.map((club)=>{return(<option selected={stateDropdown(club,employee)} value={club.id}>{club.name}</option>)})}
                        </select>
                    </div>
                    }
                    
                </Form.Group>

                <Button id="btnCancel" variant="secondary" onClick={handleCloseEA}>CANCEL</Button>
                <Button id="btnAdd" variant="primary" onClick={()=>{
                    handleCloseEA();
                    editData(employee.id, firstName, lastName, email);}}>ADD</Button>

            </Form>

        </>
    );
}
