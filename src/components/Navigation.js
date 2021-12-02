import React from "react";
import {Navbar} from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import Session  from "react-session-api";
import "./Navigation.css";

let fecthurl = 'http://www.zyoung.tech/drivers/get-json.php?action=login&uname=test&passwd=test';

class Navigation extends React.Component {
  constructor (props){
    super(props);
    //test multiple posts
      this.state = {
        userName:Session.get('username'), 
        showLogOut:false//if username is null then the login state is false
    };
  }
  
  handleClick() {

    if (Session.get("username")) {//if username exists and user click logout button; log user out and clear session
  
    console.log('clearing session...')
    Session.remove("username");
    Session.remove("passwd");
    Session.remove("value1");
    Session.remove("value2");
    this.setState({
      showLogOut:false,
      userName: Session.get("username")
  });


    } else {//if user name is null and user clicked loggin 
      console.log("clicked! and start to enter user info...")

    }
    
   
    
  }

  checkLogIn() {
          fetch(fecthurl)
          .then(response => response.json())
          .then((jsonData) => {  
          this.setState({
            userName: Session.get("username")
          });
      });
    
  }

  handleClickOthers() {
    if (!Session.get("username")){ //if user does not loggin 
        alert("you are not loggined!")
    }
  }


  loginOutSwitch () {
    if (this.state.userName) {
      
        return (
          <NavLink className="nav-link" to="/" >
          Logout
      </NavLink>        
         

        )
      
      
        
      
      
    } else {
        return (
          <NavLink className="nav-link" to="/Login" >
          Login
        </NavLink>
         
        )
      
      
       

    
  
    }
  }

  render(){
    console.log('rendering!')
    this.checkLogIn()

    return (
      <Navbar sticky="top" >
      <div className="navigation">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              ResearchSpace
            </NavLink>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <div className="dynamic-nav">
          <li className="nav-item" >
                  <NavLink className="nav-link" to="/MakePost">
                    Make A Post
                  </NavLink>
                </li>
                <li className="nav-item" >
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

        </div>
                <li className="nav-item" onClick={() => this.handleClick()}>               
                  {this.loginOutSwitch()}
                </li>
                <li className="nav-item" >
                  <NavLink className="nav-link" to="/Register">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      </Navbar>
    );

}
  




}

export default Navigation;