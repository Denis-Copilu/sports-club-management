import React, { Fragment } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './TableCoaches.css';
import { FormCreateEdit } from '../Common/OpenForm/FormCreateEdit';
import { FormDelete } from '../Common/OpenForm/FormDelete';
const URL = 'http://localhost:3000/user';
const URLClubs = 'http://localhost:3000/clubs';
export const Table = () => {
    const [employees, setEmployees] = React.useState([]);
    const [searchedEmployees, setSearchedEmployees] = React.useState([]);
    const [clubs, setClubs] = React.useState([]);
    const [showEA, setShowEA] = React.useState(false);
    const [showDel, setShowDel] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [type, setType] = React.useState("");
    const [name, setName] = React.useState("");
    const [idDel, setIdDel] = React.useState();
    const [maxID, setMaxID] = React.useState();
    const [employeeToEdit, setEmployeeToEdit] = React.useState({});
    const handleCloseEA = () => {
        setShowEA(false);
    }
    const handleShowEA = (type, employee = {}) => {
        setTitle(type + " Coach");
        setShowEA(true);
        if (employee) {
            setEmployeeToEdit(employee);
        }
    }
    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = (employee) => {
        setName(employee.name);
        setIdDel(employee.id);
        setTitle("Delete Coach");
        setShowDel(true);
    }
    React.useEffect(() => {
        getData();
    }, [])
    const getClubs = async () => {

        const response = await axios.get(URLClubs);
        setClubs(response.data);
        console.log(response.data);
    }
    React.useEffect(() => {
        getClubs();
    }, [])
    const getData = async () => {

        const response = await axios.get(URL)

        setEmployees(response.data);
        setSearchedEmployees(response.data)
        console.log(response.data[response.data.length - 1].id);
        setMaxID(response.data[response.data.length - 1].id);
    }
    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del);
            setSearchedEmployees(del)
        })
    }
    const createData = (firstName, lastName, email, editedClubs) => {
        var data = {
            id: maxID + 1,
            name: firstName + " " + lastName,
            email: email,
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
            isAthlete: false,
            clubs: editedClubs
        }
        axios.post(`${URL}`, data).then(() => {
            handleCloseEA();
        })
        console.log(data);

    }
    const editData = (id, firstName, lastName, email, editedClubs) => {
        console.log(editedClubs);
        axios.patch(`${URL}/${id}`, { name: firstName + " " + lastName, email: email, clubs: editedClubs }).then(() => {
            handleCloseEA();
        })
    }
    const renderHeader = () => {
        let headerElement = [<input type="checkbox" ></input>, 'First & Last Name', 'Email adress', 'Owned clubs', 'Actions']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
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
            <div id="btn-input">
                <input id="searchInput" onChange={(e) => { search(e) }}></input>
                <button id='btnAdd1' onClick={() => { handleShowEA("Add"); setType("add"); }}>Add new</button>
            </div>
            <table id="coaches">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
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
                                    <button id="btnEdit" onClick={() => { handleShowEA("Edit", employee); setType("edit"); }}><div id="edit-icon"></div></button>
                                    <button id="btnDelete" onClick={() => { handleCloseEA(); handleShowDel(employee) }}><div id="delete-icon"></div></button>
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
                    <FormCreateEdit employee={employeeToEdit} clubs={clubs} formType={type} handleCloseEA={handleCloseEA} handleShowDel={handleShowDel} editData={editData} createData={createData} />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
                {/* --------------------DELETE MODAL----------------------- */}
            </Modal>
            <Modal show={showDel} onHide={handleCloseDel} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="lblTitle">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FormDelete name={name} />

                </Modal.Body>
                <Modal.Footer>
                    <Button id="btnCancel" variant="secondary" onClick={handleCloseDel}>
                        CANCEL
                    </Button>
                    <Button id="btnAdd" variant="primary" onClick={() => { removeData(idDel); handleCloseDel(); }}>
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
