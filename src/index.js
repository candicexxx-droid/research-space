//import require models
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//the class Post is an object representing a single post
//on the page in the post displaying area
class Post extends React.Component {
    //how to render a single post
    render(){
        //each post is a div with a title and subject

        return (
            <div className="post">
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
            titles:['Testing Title!'],
            contents:['Testing content']
        };
    }


    //this function should get all posts from the back end and
    //insert the titile into the titles state same for content of the post
    //need to be called after sometime to dynamic update the new posts

    render(){
        //this.Get_Posts();
        //console.log(this.state.titles[0])

        const post = this.state.titles.map((title,index) => (
            <div className="post_lists" key={index}>
                <Post
                    title={title} 
                    content={this.state.contents[index]}
                />
            </div>));

        return (
            <>
            <div class="search-box">
                <button class="btn-search"><i >?</i></button>
                <input type="text" class="input-search" placeholder="Type to Search..."/>
            </div>

            {post}
            </>
        );

    }


}


ReactDOM.render(
    <PostHolder />,
    document.getElementById('root')
  );