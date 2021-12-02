import React from "react";
import axios from 'axios';
import './post.css'
import { Link, Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Session from "react-session-api";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tittle: "",
      department: "Engineering",
      content: "",
      author: "",
      api_key: "eggertisgod",
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
    var user = Session.get('username');
    var params = new URLSearchParams();
    params.append('Tittle',this.state.Tittle);
    params.append('content',this.state.content);
    params.append('author', user);
    params.append('department', this.state.department);
    params.append('api_key','eggertisgod');
    axios({
      method:'post',
      url:'http://www.zyoung.tech/drivers/post.php',
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

  render() {
    if(Session.get('username') === undefined || Session.get('username') === ""){
      alert("Please log in!");
      return(<Navigate to='/Login'/>);
    }
    return (
      <div className="write">
        <h1>Post Opportunities</h1>
        <form onSubmit={this.handleSubmit} className="writeForm">
        <div className="writeSelection">
            <label className="dept">
              Department:
              <select className="selectionBox" name="department" onChange={this.handleInputChange}>
                <option value="Engineering">Engineering</option>
                <option value="Physical Science">Physical Science</option>
                <option value="Life Science and Medical School">Life Science and Medical School</option>
                <option value="Arts and Social Science">Arts and Social Science</option>
              </select>
            </label>
          </div>
          <div className="writeFormGroup">
          <input
            required
            className="writeInput"
            placeholder="Title"
            type="text"
            name="Tittle"
            value={this.state.Tittle}
            autoFocus={true}
            onChange={this.handleInputChange}
          />
          </div>
          <div className="writeFormGroup">
            <textarea
              required
              className="writeInput writeText"
              placeholder="Research Information..."
              type="text"
              name="content"
              value={this.state.content} 
              onChange={this.handleInputChange}
              autoFocus={true}
            />
          </div>
          <div className="writeFormGroup">
            <button className="writeSubmit" type="submit">
            Publish
            </button>
            <Link className="writeSubmit" to="/">Cancel</Link>
          </div>
          <div>
            {this.state.dataSent &&
              <div className="postBanner">
                <Alert variant="success">
                <Alert.Heading><b>Post Submitted</b></Alert.Heading>
                <p>
                  Thank you for posting research opportunities on Research Space!
                </p>
                </Alert>
              </div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;