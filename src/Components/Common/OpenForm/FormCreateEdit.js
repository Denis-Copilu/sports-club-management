import axios from 'axios';
import { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import {Dropdown} from 'semantic-ui-react';
import './FormCreateEdit.css';
export const FormCreateEdit = (employee) => {
    var first_name, last_name;
    var _name = employee.name;
    var _email = employee.email;
    // console.log(employee.formType);
    if(employee.formType == "add")
    {
    first_name = "";
    last_name = "";
    }
    if(employee.formType == "edit"){
    first_name = _name.split(' ')[0];
    last_name = _name.split(' ')[1];
    }

    // const [_name, setName] = useState("");
    // const [_email, setEmail] = useState("");
    //  setName(employee.name);
    // setEmail(employee.email);
    
      
    return (
        <>

<Form>
                <Form.Group >
                    <Form.Label id="lblCreateEdit">First Name</Form.Label>
                    <Form.Control defaultValue={first_name}  type="text" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Last Name</Form.Label>
                    <Form.Control defaultValue={last_name} type="text" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Email Adress</Form.Label>
                    <Form.Control defaultValue={_email} type="text" placeholder="Enter email adress" />
                </Form.Group>

                <Form.Group >
                    <Form.Label id="lblCreateEdit">Club Assign</Form.Label>
                    <Form.Control type="text" placeholder="Enter club assign" />
                </Form.Group>

            </Form>

        </>
    );
}
