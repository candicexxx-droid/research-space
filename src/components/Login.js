import React from "react";
import axios from 'axios';
import './Login.css';
import Session from "react-session-api";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameresult: "",
      passwordresult: "",
      value1result:"",
      value2result:"",
      reading_timeresult:"",
      value:0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //var param = new URLSearchParams();
    //param.append('action','login');
    //param.append('uname',this.state.username);
    //param.append('passwd',this.state.password);

    fetch('http://www.zyoung.tech/drivers/get-json.php?action=login&uname='+this.state.username+'&passwd='+this.state.password)
    .then(response => response.json())
    .then(jsondata => {
      this.setState({
        usernameresult: jsondata.data[0].username,
        passwordresult: jsondata.data[0].password,
        value1result: jsondata.data[0].value1,
        value2result: jsondata.data[0].value2,
        reading_timeresult: jsondata.data[0].reading_time,
        value:1
      })
    })
    .catch(error => this.setState({
      error: error.message
    }));
    Session.set("username", this.state.usernameresult);
    Session.set("password", this.state.passwordresult);
    Session.set("value1", this.state.value1result);
    Session.set("value2", this.state.value2result);
    Session.set("reading_time", this.state.reading_timeresult);
    console.log(this.state.value);
    console.log(this.state.passwordresult);
    console.log(this.state.value1result);
    console.log(this.state.value2result);
    console.log(this.state.reading_timeresult);
  }

  render() {
    
    return (
      <div className="write">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="writeForm">
          <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            autoFocus={true}
            onChange={this.handleInputChange}
          />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="password"
              type="password"
              name="password"
              value={this.state.password} 
              onChange={this.handleInputChange}
              autoFocus={true}
            />
          </div>
          <div className="writeFormGroup">
            <button className="writeSubmit" type="submit">
            Login
            </button>
            <button className="writeSubmit" value="Cancel">Cancel</button>
          </div>
          <div className="writeFormGroup">
            {this.state.dataSent &&
              <div className="postBanner">Submit Post Successfully！ Thank you for posting opportunities.</div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Login;