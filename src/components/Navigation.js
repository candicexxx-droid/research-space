import React from "react";
import {Navbar} from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import Session  from "react-session-api";
// Session.set("username", null)
// console.log("check username")
// console.log(Session.get("username")==null)
class Navigation extends React.Component {
  constructor (props){
    super(props);
    //test multiple posts
    if (Session.get("username")=="" || Session.get("username")==null) {
      console.log('set login==false')
      this.state = {
        login:false //if username is null then the login state is false
    };

    } else {
      console.log('get session name')
      console.log(Session.get("username"))
      console.log('set login==true')
      this.state = {
        login:true //if username is null then the login state is false
    };

    }
    
    
  }
  
  handleClick() {
    
    if (Session.get("username")) {//if username exists and user click logout button; log user out and clear session
      this.setState({
        login: !this.state.login
    });
    Session.clear();

    }
    
   
    
  }

  loginOutSwitch () {
    
    console.log("check this.state.login")
    console.log(this.state.login)
    if (this.state.login) {
      console.log(this.state.login)
      console.log('user have loggedin')
        return (
          
          <NavLink className="nav-link" to="/" >
                    Logout
      </NavLink>

        )
      
      
        
      
      
    } else {
      console.log(this.state.login)
      console.log('user have not loggedin')
        return (
          <NavLink className="nav-link" to="/Login" >
          Login
        </NavLink>

        )
      
      
       

    
  
    }
  }

  render(){
    

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
                <li className="nav-item">
                  <NavLink className="nav-link" to="/MakePost">
                    Make A Post
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Opportunities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item" onClick={() => this.handleClick()}>
                  {this.loginOutSwitch()}
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