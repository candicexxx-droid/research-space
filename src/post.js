import React from 'react'
import ReactDOM from 'react-dom'
import './post.css'

class Postform extends React.Component {
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
      <div>
        <h1>Create Post</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="inputs">
            <label>
              Department:
              <select name="department" onChange={this.handleInputChange}>
                <option value="Engineering">Engineering</option>
                <option value="Physical Science">Physical Science</option>
                <option value="Life Science and Medical School">Life Science and Medical School</option>
                <option value="Arts and Social Science">Arts and Social Science</option>
              </select>
            </label>
          </div>
          <br />
          <div className="inputs">
            <label>
              Title:
              <input
                name="title"
                type="text"
                onChange={this.handleInputChange} />
            </label>
          </div>
          <br />
          <div className="inputs">
            <label>
              Content:
              <textarea value={this.state.content} 
              name="content" 
              onChange={this.handleInputChange} />
            </label>
          </div>
          <br />
          <input type="file"name="attachments" className="inputs" />
          <br />
          <input type="submit" value="Submit" className="inputs" />
          <input type="button" value="Cancel" className="inputs" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <Postform />,
  document.getElementById('root')
);
