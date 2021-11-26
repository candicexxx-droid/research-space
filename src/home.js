import React from 'react';

class Post extends React.Component {
    //how to render a single post
    render(){
        //each post is a div with a title and subject

        return (
            <div className="post">

                <h3 className='postDate'>{this.props.times}</h3>
                <h1 className='postTitle'>{this.props.title}</h1>
                <p className='postContent'>{this.props.content}</p>
            </div>
        );
    }
}

export default Post;
