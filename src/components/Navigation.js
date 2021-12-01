import React from "react";
import {Navbar} from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import Session  from "react-session-api";
import "./Navigation.css";

// import {Login} from "./components";
// Session.set("username", "admin")
// // console.log("check username")
// console.log('from navigation bar')
// console.log(Session.get("username"))
let fecthurl = 'http://www.zyoung.tech/drivers/get-json.php?action=login&uname=test&passwd=test';

class Navigation extends React.Component {
  constructor (props){
    super(props);
    //test multiple posts
    // if (Session.get("username")==="" || Session.get("username")===undefined) {
    //   console.log('set login==false')
      this.state = {
        userName:Session.get('username'), 
        showLogOut:false//if username is null then the login state is false
        // showLoginPage:False
    };

    // } else {
    //   // console.log('get session name')
    //   // console.log(Session.get("username"))
    //   // console.log('set login==true')
    //   this.state = {
    //     login:true //if username is null then the login state is false
    // };

    // }
    
    
  }
  
  handleClick() {

    
    // console.log("username passed from index")
    // // console.log(this.props.userName)
    // console.log("username: before execution")
    // console.log(Session.get("username"))

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
      // window.location.replace('http://localhost:3000/Login');
      // //trigger rerender, but have to wait for user to finish
      // while(!Session.get("username")){

      // }
      
      //use fetch to keep updating the state

  

    //   this.setState({
    //     userName: Session.get("username")
    // });

    }
    
   
    
  }

  checkLogIn() {
          // let userName=Session.get("username");
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

  // checkLogStatus () {
  //   // console.log("username passed from index")
  //   // console.log(this.props.userName)
    
  //   if (Session.get("username")) {//if user logged in, show make a post and profile
  //     return (
       
  //     )


  //   }  
    
  //   // else {
  //   //     return (
 

  //   //     )
  //   // }

    
    

  // }

  loginOutSwitch () {
    

    // console.log("username is")
    // console.log(Session.get("username"))
    if (this.state.userName) {
      // console.log(this.state.login)
      // console.log('user have loggedin')
      
        return (
          <NavLink className="nav-link" to="/" >
          Logout
      </NavLink>        
         

        )
      
      
        
      
      
    } else {
      // console.log(this.state.login)
      // console.log('user have not loggedin')
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