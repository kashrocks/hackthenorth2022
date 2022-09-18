import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Feed from './components/Feed'
import {
  Grid,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  LinearProgress,
  Card,
  CardActionArea,
  Button
} from '@material-ui/core'

// import { HttpsFunctions } from "../firebase";
import firebase from "firebase/compat/app";
import allPosts from './data.json';

function App() {
  const [posts, setPosts] = useState(allPosts["2"]);
  var selection = 2
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    // db.collection("posts").onSnapshot((snapshot) => {
    //     setPosts(snapshot.docs.map((doc) => doc.data()));
    // });
    // var getSpecificThread = firebase.functions().httpsCallable('getSpecificThread');
    // getSpecificThread({ id: 10 }).then((data) => { console.log(data) }).catch((error) => {
    //   console.log(error);
    // });
    // var index = (Math.floor(1 + Math.random() * 15)).toString()
    // console.log(index)
    // console.log(allPosts[index])
    // setPosts(allPosts[index]);
  }, []);

  return (
    <Box>
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant="h6" component="div">
            Catch the AI Generated Code
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className='main_layout' maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={10} />
          </Box>
          {/* <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`1 / 10`}</Typography>
            </Box> */}
        </Box>
        <Box className='margin_space' sx={{ flexGrow: 1 }}>

          <Grid container spacing={2} justifyContent="center" >
            <Grid item >
              <Box>
                <Card variant="outlined">
                  <CardActionArea
                    onClick={() => setChosen("left")}
                  >
                    <Feed name={posts.name} username={posts.username} topic={posts["Topic: "]} posts={posts["realTweets: "]} />
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>

            <Grid item >
              <Box sx={{ bgcolor: "red" }}>
                <Card variant="outlined" >
                  <CardActionArea
                    onClick={() => setChosen("right")}
                  >
                    <Feed name={posts.name} username={posts.username} topic={posts["Topic: "]} posts={posts.AITweets} />
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {(chosen != "") ?
            (chosen == "right") ? "False" : "True"
            :
            ""
          }
        </Box>
        <Button variant="contained" onClick={() => {
          selection++;
          setPosts(allPosts[selection.toString()])
          setChosen("")
          console.log(selection)
          console.log(posts)
        }}>Next</Button>
      </Container>
    </Box >
  );
}

export default App;
