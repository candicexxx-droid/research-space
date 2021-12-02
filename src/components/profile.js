import * as React from "react";
import Session  from "react-session-api";
import "./profile.css";
import { Navigate } from "react-router-dom";


let databaseurl = 'http://www.zyoung.tech/drivers/get-json.php?action=post'; //fetch all profile data 
let savedPostId="";//for testing
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
  getPostData() {
      //use fetch to keep updating the state
      let userName=Session.get("username");
      fetch(databaseurl)
      .then(response => response.json())
      .then((jsonData) => {
      // jsonData is parsed json object received from url
      let titles = [];
      let contents = [];
      let times = [];
      for(let i = 0; i < jsonData.data.length; i++){
        // console.log(jsonData.data[i].author)
        if (userName===jsonData.data[i].author){
           //fetch only the posts of user who logged in
          titles.push(jsonData.data[i].Tittle);
          contents.push(jsonData.data[i].content);
          times.push(jsonData.data[i].reading_time);

        }
          
      }
      this.setState({
          titles: titles,
          contents:contents,
          times:times,
      });
  });
  }


  getSavedPost() {

    let userData = 'http://www.zyoung.tech/drivers/get-json.php?action=login&uname='+Session.get("username")+"&passwd="+Session.get("passwd");
    
//fetch savedPostId 
    fetch(userData)
    .then(response => response.json())
    .then((jsonData) => {
    // jsonData is parsed json object received from url
    
    savedPostId=jsonData.data[0].value1;
    savedPostId=savedPostId.split(",");
    fetch(databaseurl)
      .then(response => response.json())
      .then((jsonData) => {
      // jsonData is parsed json object received from url
      let titles = [];
      let contents = [];
      let times = [];
      for(let i = 0; i < jsonData.data.length; i++){

         if (savedPostId.includes(jsonData.data[i].id)){ //if ID is included in savedPostId, then render the post 
          
          titles.push(jsonData.data[i].Tittle);
          contents.push(jsonData.data[i].content);
          times.push(jsonData.data[i].reading_time);


         }         
      }
      this.setState({
          titles: titles,
          contents:contents,
          times:times,
      });
  });
    
    

  
});





}

  render(){

      if (this.props.property==="userPost") {
        this.getPostData(); 
      } else {
        this.getSavedPost();
      }
        const post = this.state.titles.map((title,index) => (
                <UserPost
                    title={title} 
                    content={this.state.contents[index]}
                    times={this.state.times[index]}
                    key={index}
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
      <div id="row1">
      <YourPosts />
        
        <SavedPosts />

      </div>
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
        <UserPostHolder property="userPost"/>
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
        <UserPostHolder property="savedPost"/>
      </div>
      
    );
  }
}
function Profile (){
  if (!Session.get("username")) {//if user does not login
    alert("You are not loggin!"); 
    return(<Navigate to='/Login'/>);
  }else{
    return (
      <div>
        <ProfilePage />
      </div>
      );
  }
}

export default Profile;