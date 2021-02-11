import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './FormCreateEditEvent.css';
import { ImageUpload } from "../../Components/DragAndDrop/ImageUpload";
export const FormCreateEditEvent = ({ employee, formType, handleCloseEA, handleShowDel, handleShowConfirmAdd, editData, createData, clubs }) => {
    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
                <div id="groupDateTime">
                    <Form.Group >
                        <Form.Label id="lblCreateEdit">Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter date" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label id="lblCreateEdit">Time</Form.Label>
                        <Form.Control type="text" placeholder="Enter time" />
                    </Form.Group>
                </div>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">Description</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Enter description" />
                </Form.Group>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">Event Cover</Form.Label>
                    <ImageUpload />
                </Form.Group>
                <Button id="btnCancel" variant="secondary" onClick={handleCloseEA}>CANCEL</Button>
                <Button id="btnAdd" variant="primary" onClick={() => {
                    handleCloseEA();
                }}>{formType.toLowerCase() === 'add' ? 'ADD' : 'EDIT'}</Button>
            </Form>

        </>
    );
}
