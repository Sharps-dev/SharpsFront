import axios from "axios";
import React, { Component } from "react";
import {useHistory} from 'react-router';
import { useState} from "react";
import '../../styles/loginSignup.css';
import { Form, FormGroup, Label, Input, FormText } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../../styles/loginSignup.css";


import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';


  
   
function SignUp(e) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUserName] = useState("");
  
  
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
  const [lastnameErr, setLastnameErr] = useState("")
  const [firstnameErr, setFirstnameErr] = useState("")
  const [usernameErr, setUsernameErr] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passErr, setPassErr] = useState("")
  const [confirmPassErr, setConfirmPassErr] = useState("")

  const history = useHistory() ;
  const SignUp = (e) => {

    e.preventDefault();               

    const out = {
        "firstname" : firstname,
        "lastname" : lastname ,
        "username" : username , 
        "email" : email ,
        "password" : passwords.password ,
        "avatar" : null
    }

    const outJSON = JSON.stringify(out)

    console.log(outJSON);

    axios.post(serverURL()+"user/signup", outJSON , tokenConfig())
    .then(result => {
        console.log("signed up");
        console.log(result);
        localStorage.setItem('token' , result.data.token);
        
        history.push("/edit_profile");

        // add returned data to store
    }).catch(error => {       
        console.log(error.response);         
        console.log("not signed up");
    })

  };

  function validateLastname(newValue) {
    setLastname(newValue);
    let userError = "";
    if (newValue.length === 0) {
      userError = " Last name is required.";

    }
    setLastnameErr(userError);
  }

  function validateFirstname(newValue) {
    setFirstname(newValue);
    let userError = "";
    if (newValue.length === 0) {
      userError = " First name is required.";
    }
    setFirstnameErr(userError);
  }

  function validateUsername(newValue) {
    setUserName(newValue);
    let userError = "";
    if (newValue.length === 0) {
      userError = " This username is already taken!";
    }
    setUsernameErr(userError);
  }

  const validemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function validateEmail(email) {
    setEmail(email);
    let userError = "";

    if (!validemail.test(String(email).toLowerCase())) {
      userError = "Invalid email address!";
    }
    setEmailErr(userError);
  }
  const validpass = /^((?=.*[0-9]{1,})|(?=.*[!.@#$&*-_]{1,}))(?=.*[a-z]{1,}).{8,}$/;

  function validatePassword(pass) {
    setPasswords({ ...passwords, password: pass });
    let userError = "";
    if (pass.length < 8) {
      userError = "Password must be 8 characters long.";
    } else if (!validpass.test(String(pass).toLowerCase())) {
      userError = "Invalid password!";
    }

    setPassErr(userError);
  }
  function validateConfirmPassword(cpass){
    setPasswords({ ...passwords, confirmPassword: cpass })
    let userError = ""
    if (passwords.password !== cpass) {
        userError = "It doesn't match the password!"
    }
    setConfirmPassErr(userError)
}

const ErrorsOnSubmit = async () => {
    validateFirstname(firstname)
    validateLastname(lastname)
    validateUsername(username)
    validateEmail(email)
    validatePassword(passwords.password)
    validateConfirmPassword(passwords.confirmPassword)
   
    if(Boolean(usernameErr) || Boolean(firstnameErr) ||  Boolean(lastnameErr) || Boolean(emailErr) || Boolean(passErr) || Boolean(confirmPassErr))
        return;
}
return (
  <div className="row justify-content-center signupPaper">
    <Form
      className="signUpForm centered"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* <h3>SignUp</h3> */}
      <Row>
        <Form.Group as={Col} controlId="formGridFirstname">
          {/* <Form.Label>First name</Form.Label>     */}
          <Form.Control
            className="signupforms"
            type="text"
            placeholder="First Name"
            onKeyPress={(e) => {
              e.key === "Enter" && validateFirstname(e.target.value);
            }}
            onBlur={(e) => validateFirstname(e.target.value)}
            isInvalid={Boolean(firstnameErr)}
          />
          <Form.Control.Feedback type="invalid">
            {firstnameErr}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastname">
          {/* <Form.Label>Last name</Form.Label> */}
          <Form.Control
            className="signupforms"
            type="text"
            placeholder="Last Name"
            onKeyPress={(e) => {
              e.key === "Enter" && validateLastname(e.target.value);
            }}
            onBlur={(e) => validateLastname(e.target.value)}
            isInvalid={Boolean(lastnameErr)}
          />
          <Form.Control.Feedback type="invalid">
            {lastnameErr}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group controlId="username">
        {/* <label>UserName</label> */}
        <Form.Control
          className="signupforms"
          type="text"
          placeholder="Username"
          onKeyPress={(e) => {
            e.key === "Enter" && validateUsername(e.target.value);
          }}
          onBlur={(e) => validateUsername(e.target.value)}
          isInvalid={Boolean(usernameErr)}
        />
        <Form.Control.Feedback type="invalid">
          {usernameErr}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="form-group">
        {/* <label>Email Address</label> */}
        <Form.Control
          className="signupforms"
          type="email"
          placeholder="Email"
          onKeyPress={(e) => {
            e.key === "Enter" && validateEmail(e.target.value);
          }}
          onBlur={(e) => validateEmail(e.target.value)}
          isInvalid={Boolean(emailErr)}
        />
        <Form.Control.Feedback type="invalid">
          {emailErr}
        </Form.Control.Feedback>
      </div>

      <div className="form-group">
        {/* <label>Password</label> */}
        <Form.Control
          className="signupforms"
          type="password"
          placeholder="Password"
          isInvalid={Boolean(passErr)}
          onKeyPress={(e) => {
            e.key === "Enter" && validatePassword(e.target.value);
          }}
          onBlur={(e) => validatePassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {passErr}
        </Form.Control.Feedback>
      </div>
      <div className="form-group">
        {/* <label>Confirm Password</label> */}
        <Form.Control
          className="signupforms"
          type="password"
          placeholder="Confirm Password"
          isInvalid={Boolean(confirmPassErr)}
          onKeyPress={(e) => {
            e.key === "Enter" && validateConfirmPassword(e.target.value);
          }}
          onBlur={(e) => validateConfirmPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {confirmPassErr}
        </Form.Control.Feedback>
      </div>
      <button className="signupB" onClick={SignUp}>
        Sign Up
      </button>
    </Form>
  </div>
);
}

export default withRouter(SignUp);
