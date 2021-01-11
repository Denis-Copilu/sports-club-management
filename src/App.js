import './App.css';

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Login } from './Components/Login/Login';
import { Events } from './Components/Events/Events';
import { Clubs } from './Components/Clubs/Clubs';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';

  return (
    <div className="App">
      {!isLoggedIn && <Redirect to="/login" />}

      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/login" component={Login} />
        <Route path="/events" component={Events} />
        <Route path="/clubs" component={Clubs} />
      </Switch> 
    </div>
  );
}

export default App;
