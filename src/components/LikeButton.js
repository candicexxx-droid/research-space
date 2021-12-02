import React, {useState} from "react";
import cn from "classnames";
import axios from 'axios';
import Session from "react-session-api";
import "./LikeButton.scss";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



function LikeButton(props) {
    const [liked, setLiked] = useState(null);
    const id = props.id;
    //change the word in button and upload the post id to database
    function handleClick(){
        //for word change in button
        setLiked(!liked);
        //for posting data to server
        let userData = 'http://www.zyoung.tech/drivers/get-json.php?action=login&uname='+Session.get("username")+"&passwd="+Session.get("passwd");
        //console.log(userData);
        fetch(userData)
            .then(response => response.json())
            .then((jsonData) => {
                //if the post is not in the list
                if(!jsonData.data[0].value1){
                    var params = new URLSearchParams();
                    let curr = [];
                    curr.push(id)
                    params.append('username',Session.get("username"));
                    params.append('password',Session.get("passwd"));
                    params.append('value1', curr);
                    params.append('value2', 'Saved');
                    params.append('api_key','eggertisgod');
                    axios({
                    method:'post',
                    url:'http://www.zyoung.tech/drivers/add-user.php',
                    data:params
                    }).catch(error => {
                        alert(error.message)
                    });

                }else if(!jsonData.data[0].value1.split(',').includes(id)){
                    let curr = jsonData.data[0].value1.split(',');
                    curr.push(id);
                    var param = new URLSearchParams();
                    param.append('username',Session.get("username"));
                    param.append('password',Session.get("passwd"));
                    param.append('value1', curr);
                    param.append('value2', 'Saved');
                    param.append('api_key','eggertisgod');
                    axios({
                    method:'post',
                    url:'http://www.zyoung.tech/drivers/add-user.php',
                    data:param
                    }).catch(error => {
                        alert(error.message)
                    });

                }
            });

    }

    return (
        <button onClick={handleClick}
        className= {cn("like-button-wrapper", {
            liked,
        })}
        >
            <div className="like-button">
                <span>Save</span>
                <span className={cn("suffix", { liked })}>d</span>
            </div>
        </button>
    );
}

export default LikeButton;