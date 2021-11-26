import * as React from "react";
import { render } from "react-dom";
import SplitPane from "react-split-pane";

import "./profile.css";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }
  render(){
    return(
      <div>
      <h1>Profile Page</h1>
      <SplitPane className="list" defaultSize={250}>
      <YourPosts />
      <SavedPosts />
    </SplitPane>
    </div>
    );
  }
}

class YourPosts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }
  render() {
    return(
      <h3>Your Posts</h3>
    );
  }
}

class SavedPosts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }
  render() {
    return(
      <h3>Saved Posts</h3>
    );
  }
}
function Profile (){
  return (
    <div>
      <ProfilePage />
    </div>

  )
}

export default Profile;