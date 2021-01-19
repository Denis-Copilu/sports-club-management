import axios from 'axios';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Utils } from '../../../Utils/Utils';
import './OpenForm.css';

export const OpenForm = () => {
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
        console.log(response.length);
        if (data.length) {
          const loginData = {
            name: 'username',
            value: data[0].email,
            daysUntilExpire: 1,
          };

          Utils.eraseCookie('username');
          Utils.setCookie({ ...loginData });
          localStorage.setItem('isLoggedIn', true);

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
      {isLoggedIn && <Redirect to="/clubs" />}

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
      {/* <img alt="hero-img" id="hero-img" src="https://s3-alpha-sig.figma.com/img/227e/6c2b/11b38a8515a366f8cd54d8473ae1736e?Expires=1610928000&Signature=LzbQ7xLZ44KEqZx683rzPHs5ukskqVAoyCdpYOIEK~olaTEcEu9yyvI5zK1Ja1adKcV3huSgZf9ZB-GtzeiTSgDlspfGAZFiFfQnKeJYxcHOfo9SOOpld3jVDxK3PGZwX7Fu-PNhoQCuhGyQhFMlYIS8uw2n7rdBVHt0ipvqnj9L56Pfs76QbZrBWZw62qLECkbrDZ3P98dJ3W8suhD8XIIqFJPUGjhI56Ftn6KjDN7pvwNtOqkMP-x09AUboqXESbTles2~AeCWDOJS5tNbj0BRssR6ZyrbLH3wn~6PFxCY9yKp1QuW8e8SNmxFG-nIbRltRuWdqTWAG8j7DBpg2w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" /> */}
    </div>

  )
}