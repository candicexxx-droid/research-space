//import require models
import React from 'react';
import ReactDOM from 'react-dom';
import Session from 'react-session-api'
import './index.css';
import './App.css';
import App from './App';
//the class Post is an object representing a single post
//on the page in the post displaying area
let databaseurl = 'http://www.zyoung.tech/drivers/get-json.php?action=post';
let data = [];
fetch(databaseurl)
    .then(response => response.json())
    .then((jsonData) => {
    // jsonData is parsed json object received from url
    data.push(jsonData.data[0].Title);
});
console.log(data);
let testtitles = Array(10).fill('test');
let testcontent = Array(10).fill('test');

class Post extends React.Component {
    //how to render a single post
    render(){
        //each post is a div with a title and subject

        return (
            <div className="post" key={this.props.index}>
                <h3>11 October 2021</h3>
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

//this class is a area that is for displaying all posts
class PostHolder extends React.Component {
    //construstor for the holder, the posts state is intend to store all posts in the database
    constructor (props){
        super(props);
        this.state = {
            titles:testtitles,
            contents:testcontent,
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
            Session.set('posts',jsonData.data);
        });
        let posts = Session.get('posts');
        let titles = [];
        let contents = [];

        for(let i = posts.length; i >0; i--){
            titles.push(posts.Tittle)
        }
    }

    intervalSetstate(){
        let post_data = this.getSQLdata();
        this.setState({
            titles: post_data[0],
            contents: post_data[1]
        });
    }


    render(){

        const post = this.state.titles.map((title,index) => (
                <Post
                    title={title} 
                    content={this.state.contents[index]}
                    index={index}
                />));

        return (
            <>
            <App/>
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
    <PostHolder />,
    document.getElementById('root')
  );