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
    var param = new URLSearchParams();
    param.append('action','login');
    param.append('uname',this.state.username);
    param.append('passwd',this.state.password);

    axios.get('http://www.zyoung.tech/drivers/get-json.php',{
      params: param
    })
    .then(response => response.json())
    .then((jsonData) => {
      // jsonData is parsed json object received from url
      let username = jsonData.data[0].username;
      let password = jsonData.data[0].password;
      let value1 = jsonData.data[0].value1;
      let value2 = jsonData.data[0].value2;
      let reading_time = jsonData.data[0].reading_time;
      Session.set("username", jsonData.data[0].username);
      Session.set("password", jsonData.data[0].password);
      Session.set("value1", jsonData.data[0].value1);
      Session.set("value2", jsonData.data[0].value2);
      Session.set("reading_time", jsonData.data[0].reading_time);
      console.log(Session.onSet(username));
      this.setState({
        username: username,
        password:password,
        value1: value1,
        value2:value2,
        reading_time:reading_time
      });
  })
    .catch(error => this.setState({
      error: error.message
    }));
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
              placeholder=""
              type="text"
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