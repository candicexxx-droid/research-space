import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Session from "react-session-api";
import { Navigate } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        username:"",
        password:"",
        unameSQL:"",
        passwdSQL:"",
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
    let url = 'http://www.zyoung.tech/drivers/get-json.php?action=login&uname=' + this.state.username + '&passwd=' + this.state.password;
    try{
      fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
          if(!(jsonData.data == null)){
            this.setState({
              unameSQL:jsonData.data[0].username,
              passwdSQL: jsonData.data[0].password,
              value1: jsonData.data[0].value1,
              value2: jsonData.data[0].value2
            });
          }else{
            alert("Incorrect password or username!");
          }
        });
    } catch (error) {
    console.log('Request Failed', error);
    }

  }

  setSession(){
    //check if username is in database
    Session.set('username',this.state.unameSQL);
    Session.set('passwd',this.state.passwdSQL);
    Session.set('value1',this.state.value1);
    Session.set('value2',this.state.value2);
  }

  render(){
    this.setSession();
    
    if(Session.get('username') !== ''){
      alert("Welcome "+Session.get('username'));
      // window.location.replace('http://www.zyoung.tech:3000/');
      return(<Navigate to='/'/>);
      
    }else{
      return (
        <div className="Login">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.username}
                onChange={(e) => this.setState({username:e.target.value})}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({password:e.target.value})}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!this.validateForm()} className="logButton">
              Login
            </Button>
          </Form>
        </div>
      );
    }
  }
}

export default Login;