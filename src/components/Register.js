import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import "./Login.css";

class Register extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        username:"",
        password:"",
        value1:"",
        value2:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    var params = new URLSearchParams();
    params.append('username',this.state.username);
    params.append('password',this.state.password);
    params.append('Value1', "");
    params.append('Value2', "");
    params.append('api_key','eggertisgod');
    axios({
      method:'post',
      url:'http://www.zyoung.tech/drivers/add-user.php',
      data:params
    })
    .then(result => {
      this.setState({
          dataSent: 1,
      })
    })
    .catch(error => this.setState({
      error: error.message
    }));
  }

  render(){
    if(this.state.dataSent){
      alert("Successfully Registered!");
      return(<Navigate to='/Login'/>);
    }
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.username}
              onChange={(e) => this.setState({username:e.target.value})}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.password}
              onChange={(e) => this.setState({password:e.target.value})}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!this.validateForm()} className="logButton">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;