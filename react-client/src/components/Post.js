import { Avatar } from "@material-ui/core";
import {
    ChatBubbleOutline,
    FavoriteBorder,
    Publish,
    Repeat,
} from "@material-ui/icons";
import React from "react";
import "./Post.css";

function Post({ displayName, username, text, avatar }) {
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src={avatar} />
                <div className="vl"></div>
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {displayName}{" "}
                            <span className="post__headerSpecial">
                                @{username}
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>
                <div className="post__footer">
                    <div className="post__icon"><ChatBubbleOutline fontSize="small" /> <div>20</div> </div>
                    <div className="post__icon"><Repeat fontSize="small" /> 3 </div>
                    <div className="post__icon"><FavoriteBorder fontSize="small" />77</div>
                    <div className="post__icon"><Publish fontSize="small" /></div>
                </div>
            </div>
        </div>
    );
}

export default Post;