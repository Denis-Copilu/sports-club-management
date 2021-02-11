import { Navbar } from "../Common/Navbar/Navbar";
import './Athletes.css';
export const Athletes = () => {
  return (
    <div className="contentPage">
      <Navbar></Navbar>
      <div className="athletesPage">
        <p id="title">Athletes</p>
      </div>
    </div>

  );
}