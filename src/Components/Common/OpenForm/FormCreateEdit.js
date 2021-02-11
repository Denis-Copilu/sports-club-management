import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './FormCreateEdit.css';
const URL = 'http://localhost:3000/clubs';
export const FormCreateEdit = ({ employee, formType, handleCloseEA, handleShowDel, handleShowConfirmAdd, editData, createData, clubs }) => {
    let firstName = formType.toLowerCase() === 'edit' ? employee.name.split(' ')[0] : '';
    let lastName = formType.toLowerCase() === 'edit' && employee.name.split(' ')[1] ? employee.name.split(' ')[1] : '';
    let { email } = employee;
    const [editedClubs, setEditedClubs] = React.useState([]);
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [_email, setEmail] = React.useState("");
    const editClubs = () => {
        const allClubs = Array.from(document.querySelector('.custom-select').options);
        const selectedClubs = allClubs.filter(club => club.selected);
        let selectedClubsNames = [];
        selectedClubs.forEach(club => {
            selectedClubsNames.push(club.value);
        });
        setEditedClubs(selectedClubsNames);
    }
    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">First Name</Form.Label>
                    <Form.Control defaultValue={firstName} onKeyUp={(e) => { setFName(e.target.value); firstName = e.target.value; }} type="text" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Last Name</Form.Label>
                    <Form.Control defaultValue={lastName} onKeyUp={(e) => { setLName(e.target.value); lastName = e.target.value }} type="text" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Email Adress</Form.Label>
                    <Form.Control defaultValue={email} onKeyUp={(e) => { setEmail(e.target.value); email = e.target.value }} type="text" placeholder="Enter email adress" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Club Assign</Form.Label>
                    <div>
                        <select onChange={(e) => {
                            editClubs();
                        }} name='clubs' className="browser-default custom-select" multiple>
                            {
                                clubs.map((club, index) => { return (<option key={index} value={club.name}>{club.name}</option>) })
                            }
                        </select>
                    </div>
                </Form.Group>
                {formType.toLowerCase() === 'edit' ? <Button id="btnCancel" variant="secondary" onClick={() => { handleCloseEA(); handleShowDel(employee); }}>DELETE</Button> : null}
                <Button id="btnCancel" variant="secondary" onClick={handleCloseEA}>CANCEL</Button>
                <Button id="btnAdd" variant="primary" onClick={() => {
                    formType.toLowerCase() === 'edit' ? editData(employee.id, fName.length == 0 ? firstName : fName, lName.length == 0 ? lastName : lName, _email.length == 0 ? email : _email, editedClubs.length == 0 ? employee.clubs : editedClubs) : createData(fName, lName, _email, editedClubs)
                }}>{formType.toLowerCase() === 'add' ? 'ADD' : 'EDIT'}</Button>
            </Form>
        </>
    );
}
