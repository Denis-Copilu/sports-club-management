import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Utils } from '../../Utils/Utils';
import React, { Component } from 'react';
class Login1 extends Component{ 
    

 state ={
    email: '',
    password: '',
    loginError: ''
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
// 
}

handleLogin = (e) => {
    const email = this.state.email;
    const password = this.state.password;
    
    e.preventDefault();
    // setLoginError('');
    this.setState({loginError: ''})
    
    axios.get('http://localhost:3000/user', {
      params: {
        email,
        password
      }
    })
    .then(response => {
      const { data } = response;
      
      if(data.length) {
        const loginData = {
          name: 'username',
          value: data[0].email,
          daysUntilExpire: 1,
        };
console.log("login = true");
        Utils.eraseCookie('username');
        Utils.setCookie({...loginData});
        localStorage.setItem('isLoggedIn', true);

        window.location.href="/clubs";
      } else {console.log("login = false");
        //setLoginError('Email and/or password incorrect');
        this.setState({loginError: 'Email and/or password incorrect' })
      }
    })
    .catch(error => {
      console.log(error);
    });
  };
render(){
    const isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';
    const { loginError } = this.state;
return (
    <div>
      {isLoggedIn && <Redirect to="/clubs" />}

      <Row>
        <Col xs={5}>
          <p>Welcome</p>
          <h2>Login to your account</h2>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => {this.setState({email:e.target.value})}} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => {this.setState({password:e.target.value})}} type="password" placeholder="Password" />
            </Form.Group>
            <Button onClick={(e) => {this.handleLogin(e)}} variant="primary" type="submit">
              Submit
            </Button>

            {loginError.length>0 && <Alert variant={'danger'}>
              {loginError}
            </Alert>}
          </Form>
        </Col>
        <Col xs={7}>
          <img alt="hero-img" className="hero-img" src="https://s3-alpha-sig.figma.com/img/227e/6c2b/11b38a8515a366f8cd54d8473ae1736e?Expires=1610928000&Signature=LzbQ7xLZ44KEqZx683rzPHs5ukskqVAoyCdpYOIEK~olaTEcEu9yyvI5zK1Ja1adKcV3huSgZf9ZB-GtzeiTSgDlspfGAZFiFfQnKeJYxcHOfo9SOOpld3jVDxK3PGZwX7Fu-PNhoQCuhGyQhFMlYIS8uw2n7rdBVHt0ipvqnj9L56Pfs76QbZrBWZw62qLECkbrDZ3P98dJ3W8suhD8XIIqFJPUGjhI56Ftn6KjDN7pvwNtOqkMP-x09AUboqXESbTles2~AeCWDOJS5tNbj0BRssR6ZyrbLH3wn~6PFxCY9yKp1QuW8e8SNmxFG-nIbRltRuWdqTWAG8j7DBpg2w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
        </Col>
      </Row>

      <style>
        {`
          .hero-img {
            width: 100%;
            height: 100%;
            display: block;
          }

          .row {
            height: 100vh;
          }
        `}
      </style>
    </div>
  );
        }
}
export default Login1;