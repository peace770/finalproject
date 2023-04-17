import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Course,
  LoginContext,
  redirectIfUserNotSignedUp,
} from "../components/FirebaseContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../util";

export default function Dashboard() {
  const user = useContext(LoginContext);

  const [courses, setCourses] = useState(null);

  if (!courses) {
    let res;
    if (user.creator){
      res = Course.getCoursesByCreatorId(user.uid);}
    else
      res = Course.getUserCourses(user.uid);
    res.then((res) => {
      console.log(res);
      setCourses(res.docs ? res.doc.map(doc => doc.data()) : [])});
    return <h1>Loading</h1>
  }
  console.log(courses);
  return (
    <>
    {(courses.length === 0)
    ?
    <Box>
      <Typography variant="h4">My Courses</Typography>

      <Typography variant="body1">הממ.. נראה שאין לך קורסים, אתה יכול לחפש קורסים שמתאימים לך בדף הבית</Typography>
            
      <Link to="/" style={CANCEL_A_TAG_DEFAULT_STYLE}><Button variant="outlined">find course</Button></Link>
    </Box>
    :
    <Box>
      <Typography variant="h4">My Courses</Typography>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {courses.map((course, i) => (
            <Grid item key={i}>
              <Card
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "100%",
                    objectFit: "contain",
                  }}
                  image={course.url || 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png'}
                  alt="course image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.name}
                  </Typography>
                  <Typography>
                    {course.creator}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/course/${course.id}/${course.lastComponent}`}>view</Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </Box>}
     
    </>
  );
}