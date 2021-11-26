//import require models
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  MakePost,
  Profile,
} from "./components";
import Post from './components/home'
let databaseurl = 'http://www.zyoung.tech/drivers/get-json.php?action=post';





//this class is a area that is for displaying all posts
class PostHolder extends React.Component {
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
                titles.push(jsonData.data[i].Tittle);
                contents.push(jsonData.data[i].content);
                times.push(jsonData.data[i].reading_time);
            }
            this.setState({
                titles: titles,
                contents:contents,
                times:times
            });
        });
    }

    render(){
        this.getSQLdata();
        const post = this.state.titles.map((title,index) => (
                <Post
                    title={title} 
                    content={this.state.contents[index]}
                    times={this.state.times[index]}
                />));

        return (
            <>
            <div className="search-box">
                <button className="btn-search"><i >?</i></button>
                <input type="text" className="input-search" placeholder="Type to Search..."/>
            </div>
            <div className="post_lists">
                {post}
            </div>
            </>
        );

    }


}


ReactDOM.render(
    <div>
        <div className="rounter">
            <Router>
    <Navigation />
    <Routes>
        {/*home*/}
      <Route path="/" element={<PostHolder />} /> 
      <Route path="/MakePost" element={<MakePost />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    {/* <Footer /> */}
  </Router>
  </div>
    
  
    
  </div>
    ,
    document.getElementById('root')
  );