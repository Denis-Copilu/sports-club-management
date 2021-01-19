// import { Form, Button } from "react-bootstrap";
import React from 'react';
import { Navbar } from "../Common/Navbar/Navbar";
import './Coaches.css';
// import {App} from './tst.js';
// import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
// import table from './TableCoaches.js';
import {Table} from './TableCoaches';
// import {Table} from './TblC';

export const Coaches = () => {

  return (
    <div className="contentPage">
      <Navbar></Navbar>
      <div className="coachesPage">
        <p id="title">Coaches</p>
        {/* <Form.Control id="searchInput" onKeyUp="myFunction()"></Form.Control> */}
        <input id="searchInput" ></input>
         <div id="table1">
         {/* <Table id="table2"/> */}
{<Table></Table>}
         {/* <App/> */}
        </div>
      </div>
    </div>

  );
}