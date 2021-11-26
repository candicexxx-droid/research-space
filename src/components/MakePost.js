import React from "react";

import './post.css'

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      department: "Engineering",
      content: "",
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
    console.log("department:"+this.state.department+"\ntitle:"+this.state.title+"\ncontent:"+this.state.content);
    event.preventDefault();
  }

  render() {
    return (
      <div className="write">
        <h1>Create Post</h1>
        <form onSubmit={this.handleSubmit} className="writeForm">
        <div className="writeSelection">
            <label>
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
            className="writeInput"
            placeholder="Title"
            type="text"
            name="title"
            value={this.state.title}
            autoFocus={true}
            onChange={this.handleInputChange}
          />
          </div>
          <div className="writeFormGroup">
            <textarea
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
          <input type="file"name="attachments" className="inputs" />
          <button className="writeSubmit" type="submit">
          Publish
          </button>
          <button className="writeSubmit" value="Cancel">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}


function MakePost() {
  return (
    <PostForm />
  );
}

export default MakePost;