import React from 'react';
import { Navbar } from "../Common/Navbar/Navbar";
import './Coaches.css';
import {Table} from './TableCoaches';

export const Coaches = () => {

  return (
    <div className="contentPage">
      <Navbar></Navbar>
      <div className="coachesPage">
        <p id="title">Coaches</p>
         <div id="table1">
           {<Table></Table>}
        </div>
      </div>
    </div>

  );
}