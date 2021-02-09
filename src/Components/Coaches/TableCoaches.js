import React, { Fragment } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './TableCoaches.css';
import { FormCreateEdit } from '../Common/OpenForm/FormCreateEdit';
import { FormDelete } from '../Common/OpenForm/FormDelete';
import { FormConfirmAdd } from '../Common/OpenForm/FormConfirmAdd';
import  Pagination  from '../Common/Pagination/Pagination';
 import ReactPaginate from 'react-paginate';
const URL = 'http://localhost:3000/user';
const URLClubs = 'http://localhost:3000/clubs';
export const Table = () => {
    const [employees, setEmployees] = React.useState([]);
    const [searchedEmployees, setSearchedEmployees] = React.useState([]);
    const [clubs, setClubs] = React.useState([]);
    const [showEA, setShowEA] = React.useState(false);
    const [showDel, setShowDel] = React.useState(false);
    const [showConfirmAdd, setShowConfirmAdd] = React.useState(false);
    const [showEditedClubs,setShowEditedClubs] = React.useState();
    const [title, setTitle] = React.useState("");
    const [type, setType] = React.useState("");
    const [name, setName] = React.useState("");
    const [idDel, setIdDel] = React.useState();
    const [maxID, setMaxID] = React.useState();
    const [employeeToEdit, setEmployeeToEdit] = React.useState({});
    const [employeeToDelete, setEmployeeToDelete] = React.useState();
     /////////////////////////////
     const [currentPage, setCurrentPage] = React.useState(1);
     const [postsPerPage] = React.useState(5);
    //  React.useEffect(()=>{
    //     const fetchPosts = async () =>{
    //         setLoading(true);
    //         const res = await axios.get('');
    //     }
    //  });
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = searchedEmployees.slice(indexOfFirstPost,indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
     /////////////////////////////

     React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        // setLoading(true);

        const response = await axios.get(URL)

        // setPosts(response.data);

        setEmployees(response.data);
        setSearchedEmployees(response.data)
        console.log(response.data[response.data.length - 1].id);
        setMaxID(response.data[response.data.length - 1].id);

        // setLoading(false);

    }

    const getClubs = async () => {

        const response = await axios.get(URLClubs);
        setClubs(response.data);
        console.log(response.data);
    }
    React.useEffect(() => {
        getClubs();
    }, [])
    
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
    //
    const handleCloseConfirmAdd = () => {
        setShowConfirmAdd(false);
    }
    const handleShowConfirmAdd = () => {
        setTitle("Coach Added");
        setShowConfirmAdd(true);
        // if (employee) {
        //     setEmployeeToEdit(employee);
        // }
    }
    //
    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = (employee) => {
        let nameCoachToBeDeleted = [];
        let idCoachToBeDeleted = [];
        if(employee instanceof Array)
        {
            //console.log(employees);
            employees.map((emp)=>{employee.forEach((idEmp)=>{if(emp.id == idEmp){nameCoachToBeDeleted.push(emp.name);idCoachToBeDeleted.push(idEmp);console.log(emp.name+" "+idEmp);}})})
            setName(nameCoachToBeDeleted);
            setIdDel(idCoachToBeDeleted);
        }
        else{
        setName(employee.name);
        setIdDel(employee.id);
        }
        
        setTitle("Delete Coach");
        setShowDel(true);
    }
    
    const removeData = (id) => {
        //functioneaza stergerea, dar se opreste serverul
        // if(id.length!=undefined)
        if(id instanceof Array)
        {
        id.forEach(id=>{console.log(id);
        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del);
            setSearchedEmployees(del)
        })
        });
        console.log("arr");
            
        }
        else{
            console.log("not arr");
            axios.delete(`${URL}/${id}`).then(res => {
                const del = employees.filter(employee => id !== employee.id)
                setEmployees(del);
                setSearchedEmployees(del)
            })
        }
        window.location.reload();
        // id.forEach(id=>{
        //     console.log(id);
        // })
        // axios.delete(`${URL}/${id}`).then(res => {
        //     const del = employees.filter(employee => id !== employee.id)
        //     setEmployees(del);
        //     setSearchedEmployees(del)
        // })
    }
    const createData = (firstName, lastName, email, editedClubs) => {
        console.log(firstName + " " + lastName);
        setShowEditedClubs(editedClubs);
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
        window.location.reload();
        console.log(data);

    }
    const editData = (id, firstName, lastName, email, editedClubs) => {
        console.log(editedClubs);
        axios.patch(`${URL}/${id}`, { name: firstName + " " + lastName, email: email, clubs: editedClubs }).then(() => {
            //window.location.reload();
            handleCloseEA();
            window.location.reload();
        })
    }
    const renderHeader = () => {
        let headerElement = [<input onChange={()=>selectAllCoaches('.checkbox-all')} className="checkbox-all" type="checkbox" ></input>, 'First & Last Name', 'Email adress', 'Owned clubs', 'Actions']

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
    const coachToBeDeleted = () => {
        const allCoach = document.querySelectorAll('.checkbox-coach');
        const btnDel1= document.getElementById('btnDel1');
        let selectedCoachId = [];
        allCoach.forEach(coach => {if(coach.checked){selectedCoachId.push(coach.id)}  console.log(coach.checked+" "+coach.id);});
        if(selectedCoachId.length>=1) {
            btnDel1.style.display="inline-flex";
        }
        else
        {
            btnDel1.style.display="none";
        }
        setEmployeeToDelete(selectedCoachId);
        
        console.log(selectedCoachId);
    }
    const selectAllCoaches = (classInputAll) =>{
        const stateCheckboxAll = document.querySelector(classInputAll);
        const allCoach = document.querySelectorAll('.checkbox-coach');
        const btnDel1= document.getElementById('btnDel1');
        let selectedCoachId = [];
        let selectedCoachName = [];
        console.log(stateCheckboxAll.checked);
        //console.log(btnDel1.style.display);
        //stateCheckboxAll.checked ? allCoach.forEach(coach => { coach.checked=true;}) : allCoach.forEach(coach => { coach.checked=false;});
        if(stateCheckboxAll.checked){  
            allCoach.forEach(coach => { coach.checked=true;});

            btnDel1.style.display="inline-flex";
            console.log(allCoach);
            allCoach.forEach(coach => {if(coach.checked){selectedCoachId.push(coach.id);}  console.log(coach.checked+" "+coach.id);});
            setEmployeeToDelete(selectedCoachId);
        }
        else if(stateCheckboxAll.checked==false)
        {
            allCoach.forEach(coach => { coach.checked=false;});
            btnDel1.style.display="none";
            allCoach.forEach(coach => {if(coach.checked){selectedCoachId.pop(coach.id)}  console.log(coach.checked+" "+coach.id);});
            setEmployeeToDelete(selectedCoachId);
        }
         setEmployeeToDelete(selectedCoachId);
        
    }
    return (
        <Fragment>
            <div id="btn-input">
                <input id="searchInput" onChange={(e) => { search(e) }}></input>
                <button id='btnAdd1' onClick={() => { handleShowEA("Add"); setType("add"); }}>Add new</button>
                <button id='btnDel1' display="none"  className="btn-danger" onClick={() => {handleShowDel(employeeToDelete); console.log("Esti pe cale sa stergi ceva. :D"); }}>Delete</button>
            </div>
            <table id="coaches">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {currentPost && currentPost.map((employee) => {
                        return (

                            <tr key={employee.id}>
                                <td className='selected'>
                                    <input onChange={coachToBeDeleted} id={employee.id} className="checkbox-coach" type="checkbox" ></input>
                                {/* <p>{employee.id}</p> */}
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.clubs +", "}</td>
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
            <Pagination 
            postsPerPage={postsPerPage} 
            totalPosts={searchedEmployees.length} 
            paginate={paginate}
            />
            
            {/* <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={15}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={1}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
        /> */}
            <Modal show={showEA} onHide={handleCloseEA} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="lblTitle">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormCreateEdit employee={employeeToEdit} clubs={clubs} formType={type} handleCloseEA={handleCloseEA} handleShowDel={handleShowDel} handleShowConfirmAdd={handleShowConfirmAdd} editData={editData} createData={createData} />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            {/* --------------------DELETE MODAL----------------------- */}
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
            {/* --------------------CONFIRM ADD MODAL----------------------- */}
            <Modal show={showConfirmAdd} onHide={handleCloseConfirmAdd} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="lblTitle">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FormConfirmAdd name={name} clubs={showEditedClubs}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button id="btnAdd" variant="secondary" onClick={handleCloseConfirmAdd}>
                        CLOSE
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
