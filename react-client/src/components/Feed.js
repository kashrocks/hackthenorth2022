import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
// import db from "./firebase";
import { Box, Card, CardActionArea } from '@material-ui/core';

function Feed({ name, username, topic, posts }) {

    return (
        <>
            <Post
                // key={Math.random() * 1324343453}
                displayName={name}
                username={username}
                text={topic}
                avatar={""}
            />

            {posts?.map((post) => (
                <Post
                    // key={Math.random() * 1324343453}
                    displayName={name}
                    username={username}
                    text={post}
                    avatar={""}
                />
            ))}
            {/* </div > */}
        </>
    );
}

export default Feed;