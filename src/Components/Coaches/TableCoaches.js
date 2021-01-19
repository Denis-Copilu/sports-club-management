import React, {Fragment} from 'react';
import axios from 'axios';
import './TableCoaches.css';
const URL = 'http://localhost:3000/user'
//const URL = '../db.json'

export const Table = () => {
    const [employees, setEmployees] = React.useState([]);
    const [searchedEmployees, setSearchedEmployees] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data);
        setSearchedEmployees(response.data)
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
          axios.post(`${URL}`,data)

        
    }
    const putData = (id) => {
        axios.patch(`${URL}/${id}`,{name : "Luciano"});      
        
    }
    const renderHeader = () => {
        let headerElement = ['', 'First & Last Name', 'Email adress', 'Owned clubs', 'Actions']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {
      
        return searchedEmployees && searchedEmployees.map(({ id, name, email, phone } ) => {
            return (
              
                <tr key={id}>
                    <td className='selected'>
                    <input type="checkbox" ></input>
                    </td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
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

        if(!searchedWord.length > 0) {
            setSearchedEmployees(employees);
        } else {
            let searched = searchedEmployees.filter(employee => employee.name.toLowerCase().includes(searchedWord.toLowerCase()));
            setSearchedEmployees(searched);
        }
      
    //   debugger
          
            
      
    }
    const handleOpenForm = (type,user) =>{
//aici voi introduce o conditie pentru a schimba textul din label al formelor de adaugare/stergere
    }
    return (
        <Fragment>
        <input id="searchInput" onChange={(e) => {search(e)}}></input>
        <button className='button' onClick={() => handleOpenForm('create', employees)}>Add</button>{/*addData()*/}
        <table id="coaches">
            <thead>
                <tr>{renderHeader()}</tr>
            </thead>
            <tbody>
                {/* {renderBody()} */}

                {searchedEmployees && searchedEmployees.map((employee ) => {
            return (
              
                <tr key={employee.id}>
                    <td className='selected'>
                    <input type="checkbox" ></input>
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td className='actions'>
                        <button className='button' onClick={() => removeData(employee.id)}>Delete</button>
                        <button className='button' onClick={() => putData(employee.id)}>Edit</button>
                    </td>
                </tr>
            )
        })
    }
            </tbody>
        </table>
        </Fragment>
    )
}


// ReactDOM.render(<Table />, document.getElementById('root'));