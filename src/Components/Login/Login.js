import axios from 'axios';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Form, Alert } from 'react-bootstrap';
import { Utils } from '../../Utils/Utils';
import './Login.css';
import img_hero from '../../assets/Images/hero-img.png';

export const Login = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    axios.get('http://localhost:3000/user', {
      params: {
        email,
        password,
      }
    })
      .then(response => {
        const { data } = response;
        if (data.length && data[0].isAdmin === true) {
          const loginData = {
            name: data[0].name,
            value: data[0].email,
            daysUntilExpire: 1,
          };
          Utils.eraseCookie('username');
          Utils.setCookie({ ...loginData });
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('username', loginData.name);
          window.location.href = "/coaches";
        } else {
          setLoginError('Email and/or password incorrect');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div id="content-page">
      {isLoggedIn && <Redirect to="/coaches" />}

      <div className="contentLog">
        <div className="elementsLogin">
          <div id="logMsg">
            <p id="p1">Welcome</p>
            <h2 id="p2">Login to your account</h2>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label id="lbl">Email address</Form.Label>
              <Form.Control onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label id="lbl">Password</Form.Label>
              <Form.Control onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
            </Form.Group>
            <Button id="btnSubmit" onClick={(e) => { handleLogin(e) }} variant="primary" type="submit">
              LOGIN
            </Button>
            {loginError && <Alert variant={'danger'}>
              {loginError}
            </Alert>}
          </Form>
        </div>
      </div>
      <img alt="hero-img" id="hero-img" src={img_hero} />
    </div>

  )
}