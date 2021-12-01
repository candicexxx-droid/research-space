//import require models
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Session from "react-session-api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Login,
  MakePost,
  Profile,
  LikeButton,
  Filter,
} from "./components";

let databaseurl = 'http://www.zyoung.tech/drivers/get-json.php?action=post';
//Session.set("username","");
//Session.set("passwd","");



function Post(props){

    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
      setActive(!isActive);
    };
    let savekey;
    if(props.logedin){
        savekey = <LikeButton id={props.id}/>;
    }else{
        savekey = <h4 className='postDate'>Please log in</h4>;
    }

    //each post is a div with a title and subject
    return (
        <>
        <div className="post">
            <h3 className='postDate'>{props.author +" " +  props.times}</h3>
            <h3 className='postDate'>{"Department: " + props.department}</h3>
            <h1 className='postTitle'  onClick={handleToggle}>{props.title}</h1>
            <p className='postContent'>{isActive ? "": props.content}</p>
            {savekey}
        </div>
        
        </>
        
    );

}




//this class is a area that is for displaying all posts
class PostHolder extends React.Component {
    //construstor for the holder, the posts state is intend to store all posts in the database
    constructor (props){
        super(props);
        //test multiple posts
        this.state = {
            titles:[],
            contents:[],
            times:[],
            IDs:[],
            authors:[],
            department:[],
            logedin:false,
            searchInput: ""
        };

        this.handleSearch = this.handleSearch.bind(this);
    }


    handleSearch(event) {
        this.setState({searchInput: event.target.value});
    }

    //this function should get all posts from the back end and
    //insert the titile into the titles state same for content of the post
    //need to be called after sometime to dynamic update the new posts
    getSQLdata() {
        //use fetch to keep updating the state
        fetch(databaseurl)
            .then(response => response.json())
            .then((jsonData) => {
            // jsonData is parsed json object received from url
            let titles = [];
            let contents = [];
            let times = [];
            let IDs = [];
            let authors = [];
            let department = [];
            let filtobj;
            if (Session.get('filteroption').split(',').includes('')){
                filtobj = [];
            }else{
                filtobj = Session.get('filteroption').split(',');
            }
            //console.log(filtobj);
            //for there is a search string
            //let filtobj=[];
            if(this.state.searchInput){
                //search string and filter both apply
                for(let i = 0; i < jsonData.data.length; i++){
                    let searchString = this.state.searchInput.toLowerCase();
                    if(jsonData.data[i].Tittle.toLowerCase().includes(searchString) || jsonData.data[i].content.toLowerCase().includes(searchString) || jsonData.data[i].author.toLowerCase().includes(searchString))
                    {
                        if(!filtobj.length || (filtobj.includes(jsonData.data[i].department))){
                            titles.push(jsonData.data[i].Tittle);
                            contents.push(jsonData.data[i].content);
                            times.push(jsonData.data[i].reading_time);
                            IDs.push(jsonData.data[i].id);
                            authors.push(jsonData.data[i].author);
                            department.push(jsonData.data[i].department);
                        }

                    }
                }
            }
            else{
                for(let i = 0; i < jsonData.data.length; i++){
                    if(!filtobj.length || filtobj.includes(jsonData.data[i].department)){
                        titles.push(jsonData.data[i].Tittle);
                        contents.push(jsonData.data[i].content);
                        times.push(jsonData.data[i].reading_time);
                        IDs.push(jsonData.data[i].id);
                        authors.push(jsonData.data[i].author);
                        department.push(jsonData.data[i].department);
                    }
                }
            }
            if(Session.get('username') === '' || Session.get('username') === undefined){
                this.setState({
                    titles: titles,
                    contents:contents,
                    times:times,
                    IDs:IDs,
                    authors:authors,
                    department:department,
                });
            }else{
                this.setState({
                    titles: titles,
                    contents:contents,
                    times:times,
                    IDs:IDs,
                    authors:authors,
                    department:department,
                    logedin:true,
                });
            }
        });
    }




    render(){
        this.getSQLdata();
        //console.log(Session.get('username'));
        const post = this.state.titles.map((title,index) => (
                <Post
                    title={title} 
                    content={this.state.contents[index]}
                    times={this.state.times[index]}
                    author={this.state.authors[index]}
                    id={this.state.IDs[index]}
                    department={this.state.department[index]}
                    logedin={this.state.logedin}
                    key={index}
                />));
            //Read Session
console.log("The username is: " + Session.get('username'));
        return (
            <>
            <div className="search-box">
                <button className="btn-search"><i >?</i></button>
                <input type="text" className="input-search" placeholder="Type to Search..." value={this.state.searchInput} onChange={this.handleSearch}/>
            </div>
            <Filter/>
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

      <Route path="/" element={<PostHolder />} /> 
      <Route path="/MakePost" element={<MakePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Login" element={<Login />} />
    </Routes>

  </Router>
  </div>
    
  
    
  </div>
    ,
    document.getElementById('root')
  );