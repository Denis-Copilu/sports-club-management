import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css';
import Multiple from './MultiSelect';
import './FormCreateEdit.css';
const URL = 'http://localhost:3000/clubs';
export const FormCreateEdit = ({ employee, formType, handleCloseEA, handleShowDel, editData, createData, clubs }) => {
    console.log(employee)
    let firstName = formType.toLowerCase() === 'edit' ? employee.name.split(' ')[0] : '';
    let lastName = formType.toLowerCase() === 'edit' && employee.name.split(' ')[1] ? employee.name.split(' ')[1] : '';
    let { email } = employee;
    let editedClubs = employee.clubs;
    let _clubs = [];
    function setEditedClubs(nameClubs) {
        nameClubs.map((club) => { _clubs.push(club.label); })
        editedClubs = _clubs.filter(function (elem, pos) {
            return _clubs.indexOf(elem) == pos;
        });
        console.log(editedClubs);
    }
    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">First Name</Form.Label>
                    <Form.Control defaultValue={firstName} onKeyUp={(e) => { firstName = e.target.value }} type="text" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Last Name</Form.Label>
                    <Form.Control defaultValue={lastName} onKeyUp={(e) => { lastName = e.target.value }} type="text" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Email Adress</Form.Label>
                    <Form.Control defaultValue={email} onKeyUp={(e) => { email = e.target.value }} type="text" placeholder="Enter email adress" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Club Assign</Form.Label>
                    <div>
                        <Multiple setEditedClubs={setEditedClubs} options={clubs} />
                    </div>
                </Form.Group>
                {formType.toLowerCase() === 'edit' ? <Button id="btnCancel" variant="secondary" onClick={() => { handleCloseEA(); handleShowDel(employee); }}>DELETE</Button> : null}
                <Button id="btnCancel" variant="secondary" onClick={handleCloseEA}>CANCEL</Button>
                <Button id="btnAdd" variant="primary" onClick={() => {
                    formType.toLowerCase() === 'edit' ? editData(employee.id, firstName, lastName, email, editedClubs) : createData(firstName, lastName, email, editedClubs)
                }}>{formType.toLowerCase() === 'add' ? 'ADD' : 'EDIT'}</Button>

            </Form>

        </>
    );
}
