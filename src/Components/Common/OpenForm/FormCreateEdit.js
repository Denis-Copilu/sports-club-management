import axios from 'axios';
import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import MultiSelect from './MultiSelect';
import 'semantic-ui-css/semantic.min.css';

import './FormCreateEdit.css';
const URL = 'http://localhost:3000/clubs';
export const FormCreateEdit = ({ employee, formType, handleCloseEA, handleShowDel, editData, createData, clubs}) => {
    console.log(employee)
    let firstName = formType.toLowerCase() === 'edit' ? employee.name.split(' ')[0] : '';
    let lastName = formType.toLowerCase() === 'edit' && employee.name.split(' ')[1] ? employee.name.split(' ')[1] : ''; 
    let { email } = employee;
    //const[editedClubs,setEditedClubs] = React.useState([]);
    let editedClubs = employee.clubs;
    let _clubs = [];
        
    //const [selected, setSelected] = React.useState([]);
    // const option = [
    //     { label: "Grapes 🍇", value: "grapes" },
    //     { label: "Mango 🥭", value: "mango" },
    //     { label: "Strawberry 🍓", value: "strawberry",disabled: true },
    //     { label: "Watermelon 🍉", value: "watermelon" },
    //     { label: "Pear 🍐", value: "pear" },
    //     { label: "Apple 🍎", value: "apple" },
    //     { label: "Tangerine 🍊", value: "tangerine" },
    //     { label: "Pineapple 🍍", value: "pineapple" },
    //     { label: "Peach 🍑", value: "peach" },
    //   ];
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
                    <div>
                        <select onChange={(e)=>{
                            _clubs.push(e.target.value);
                            editedClubs = _clubs.filter(function(elem, pos) {
                                return _clubs.indexOf(elem) == pos;
                        });
                            }} name='clubs' className="browser-default custom-select" multiple>
                        {
                        clubs.map((club)=>{return(<option value={club.name}>{club.name}</option>)})
                        }
                        </select>
                    </div>
                    
                    
                    {/* <Dropdown 
                    className="drop-down"
                    placeholder="Filter Category"
                    fluid
                    search
                    selection
                    multiple
                    options={option}
                    /> */}
                    {/* <MultiSelect options={clubs} employee={employee} setEditedClubs={setEditedClubs}/>  */}
                </Form.Group>
                {formType.toLowerCase() === 'edit'?<Button id="btnCancel" variant="secondary" onClick={()=>{handleCloseEA();handleShowDel(employee);}}>DELETE</Button>:null}
                <Button id="btnCancel" variant="secondary" onClick={handleCloseEA}>CANCEL</Button>
                <Button id="btnAdd" variant="primary" onClick={()=>{
                    
                    formType.toLowerCase() === 'edit' ? editData(employee.id, firstName, lastName, email, editedClubs):createData(firstName,lastName,email,editedClubs)
                }}>{formType.toLowerCase() === 'add'?'ADD':'EDIT'}</Button>

            </Form>

        </>
    );
}
