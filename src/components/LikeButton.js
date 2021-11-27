import React, {useState} from "react";
import cn from "classnames";

import "./LikeButton.scss";

function LikeButton() {
    const [liked, setLiked] = useState(null);

    return (
        <button onClick={() => setLiked(!liked)}
        className= {cn("like-button-wrapper", {
            liked,
        })}
        >
            <div className="like-button">
                <span>Save</span>
                <sapn className={cn("suffix", { liked })}>d</sapn>
            </div>
        </button>
    );
}

export default LikeButton;