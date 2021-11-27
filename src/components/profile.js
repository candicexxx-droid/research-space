import * as React from "react";
import { render } from "react-dom";
import SplitPane from "react-split-pane";
// import Post from './home'
import "./profile.css";

let databaseurl = 'http://www.zyoung.tech/drivers/get-json.php?action=login&uname=test&passwd=test';

let testtitles = Array(10).fill('test');
let testcontent = Array(10).fill('test\ntesttesttest hi\neggert is dumb hihihihih');
let testdate = Array(10).fill('2021-11-25 05:16:08');

class UserPost extends React.Component {
  //how to render a single post
  render(){
      //each post is a div with a title and subject

      return (
          <div className="UserPost">

              <h3 className='userPostDate'>{this.props.times}</h3>
              <h1 className='userPostTitle'>{this.props.title}</h1>
              <p className='userPostContent'>{this.props.content}</p>
          </div>
      );
  }
}

class UserPostHolder extends React.Component {
  //construstor for the holder, the posts state is intend to store all posts in the database
  constructor (props){
      super(props);
      //test multiple posts
      this.state = {
          titles:[],
          contents:[],
          times:[]
      };
  }


  //this function should get all posts from the back end and
  //insert the titile into the titles state same for content of the post
  //need to be called after sometime to dynamic update the new posts
  getSQLdata() {
      fetch(databaseurl)
          .then(response => response.json())
          .then((jsonData) => {
          // jsonData is parsed json object received from url
          let titles = [];
          let contents = [];
          let times = [];
          for(let i = jsonData.data.length- 1; i >= 0; i--){
              titles.push(jsonData.data[i].username);
              contents.push(jsonData.data[i].password);
              times.push(jsonData.data[i].value1);
          }
          this.setState({
              titles: titles,
              contents:contents,
              times:times
          });
      });
  }

  render(){
      this.getSQLdata(); //fetch data from backend 
    //   this.state = {
    //     titles:testtitles,
    //     contents:testcontent,
    //     times:testdate
    // };
      const post = this.state.titles.map((title,index) => (
              <UserPost
                  title={title} 
                  content={this.state.contents[index]}
                  times={this.state.times[index]}
              />));

      return (
          <>
          <div className="userPostL">
              {post}
          </div>
          </>
      );

  }


}


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }
  render(){
    return(
      <div >
      <h1>Profile Page</h1>
      <div className='containAll'>
      {/* <SplitPane className="list" defaultSize={500} primary="first"> */}
      <div id="row1">
      <YourPosts />
        
        <SavedPosts />

      </div>
      
     
      
      
    {/* </SplitPane> */}
      </div>
      
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
      <div className='userPt'> 
        <h3>Your Posts</h3>
        <UserPostHolder />
      </div>
      
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
      <div className='userPt'>
        <h3>Saved Posts</h3>
        <UserPostHolder />
      </div>
      
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