import React, { Fragment } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './TableCoaches.css';
import { FormCreateEdit } from '../Common/OpenForm/FormCreateEdit';
import { FormDelete } from '../Common/OpenForm/FormDelete';
const URL = 'http://localhost:3000/user';

export const Table = () => {
    const [employees, setEmployees] = React.useState([]);
    const [searchedEmployees, setSearchedEmployees] = React.useState([]);
    //const [clubs, setClubs] = React.useState([]);
    
    const [showEA, setShowEA] = React.useState(false);
    const [showDel, setShowDel] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [type, setType] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    
    const handleCloseEA = () => setShowEA(false);
    const handleShowEA = (type,employee) =>{
        setTitle(type + " Coach"); 
        setName(employee.name);
        setEmail(employee.email);     
        setShowEA(true); 

    } 
    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = (employee) =>{
        setName(employee.name);
        setTitle("Delete Coach");   
        setShowDel(true); 

    } 

    React.useEffect(() => {
        getData();
    }, [])
    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data);
        setSearchedEmployees(response.data)
        //console.log(response.data.clubs);
    }
    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del);
            setSearchedEmployees(del)
        })
    }
    const addData = () => {
        var data = {
            id: 4,
            name: "Admin John",
            email: "admin@gmail.com",
            password: "parola",
            gender: "male",
            primary_sport_id: 0,
            secondary_sport_id: 0,
            height: 170,
            weight: 90,
            age: 25,
            profile_photo: " ",
            isAdmin: true,
            isCoach: false,
            isAthlete: false
        }
        axios.post(`${URL}`, data)


    }
    const putData = (id, _name, _email) => {
        axios.patch(`${URL}/${id}`, { name: _name, _email });

    }
    const renderHeader = () => {
        let headerElement = ['', 'First & Last Name', 'Email adress', 'Owned clubs', 'Actions']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {

        return searchedEmployees && searchedEmployees.map(({ id, name, email, clubs }) => {
            return (

                <tr key={id}>
                    <td className='selected'>
                        <input type="checkbox" ></input>
                    </td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{clubs}</td>
                    <td className='actions'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                        <button className='button' onClick={() => putData(id)}>Edit</button>
                    </td>
                </tr>
            )
        })
    }
    const search = (e) => {
        const searchedWord = e.target.value;
        console.log(searchedWord)

        if (!searchedWord.length > 0) {
            setSearchedEmployees(employees);
        } else {
            let searched = searchedEmployees.filter(employee => employee.name.toLowerCase().includes(searchedWord.toLowerCase()));
            setSearchedEmployees(searched);
        }
    }
    return (
        <Fragment>
           <div id ="btn-input">
            <input id="searchInput" onChange={(e) => { search(e) }}></input>
            <button id='btnAdd1' onClick={()=>{handleShowEA("Add",employees);setType("add");}}>Add</button>
           </div>
            <table id="coaches">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {/* {renderBody()} */}

                    {searchedEmployees && searchedEmployees.map((employee) => {
                        return (

                            <tr key={employee.id}>
                                <td className='selected'>
                                    <input type="checkbox" ></input>
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.clubs}</td>
                                <td className='actions'>
                                    <button id="btnEdit" onClick={()=>{handleShowEA("Edit",employee);setType("edit");}}><div id="edit-icon"></div></button>
                                    <button id="btnDelete" onClick={()=>{handleCloseEA(); handleShowDel(employee)}}><div id="delete-icon"></div></button>                                   
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
      <Modal show={showEA} onHide={handleCloseEA} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="lblTitle">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormCreateEdit name = {name} email = {email} formType={type}/>
        </Modal.Body>
        <Modal.Footer>
        <Button id="btnCancel" variant="secondary" onClick={handleCloseEA}>
                        CANCEL
                    </Button>
        <Button id="btnAdd" variant="primary" onClick={handleCloseEA}>
                        ADD
                    </Button>
        </Modal.Footer>
        {/* --------------------DELETE MODAL----------------------- */}
      </Modal>
      <Modal show={showDel} onHide={handleCloseDel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="lblTitle">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

       <FormDelete name = {name}/>

        </Modal.Body>
        <Modal.Footer>
        <Button id="btnCancel" variant="secondary" onClick={handleCloseDel}>
                        CANCEL
                    </Button>
        <Button id="btnAdd" variant="primary" onClick={handleCloseDel}>
                        DELETE
                    </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}
