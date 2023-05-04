import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Course,
  LoginContext,
  cancelCourseSubscription,
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
import { getAuth, reload } from "firebase/auth";
import DashboardCourseCard from "../components/DashboardCourseCard";
import StandartLoadingPage from "../components/StandartLoadingPage";

export default function Dashboard() {
  const user = useContext(LoginContext);
  const [courses, setCourses] = useState(null);

  function triggerReload() {
    setCourses(null);
  }
  function handleCreateCourse() {
    Course.createNewCourse("new course").then((course) =>
      window.location.assign(`/course/${course.id}`)
    );
  }

  if (!courses) {
    if (user.creator) {
      Course.getCoursesByCreatorId(user.uid).then((result) =>
        setCourses(result.docs.map((doc) => doc.data()))
      );
    } else {
      Course.getUserCourses(user.uid).then((result) => setCourses(result));
    }
    return <StandartLoadingPage primary={'טוען קורסים...'}/>;
  }
  
  return (
    <Box py={"5vh"} px={"5vw"}>
      <Typography variant="h4" gutterBottom={true}>
        הקורסים שלי
      </Typography>
      {user.creator ? (
        <Button onClick={handleCreateCourse}>צור קורס חדש</Button>
      ) : (
        <></>
      )}
      {courses.length === 0 ? (
        <Box>
          {!user.creator ? (
            <>
              {" "}
              <Typography variant="body1">
                הממ.. נראה שאין לך קורסים, אתה יכול לחפש קורסים שמתאימים לך בדף
                הבית
              </Typography>
              <Link to="/" style={CANCEL_A_TAG_DEFAULT_STYLE}>
                <Button variant="outlined">find course</Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <Box>
          <Container
            sx={{ marginInlineStart: "0em" }}
            maxWidth="sm"
            disableGutters
          >
            <Grid container spacing={4} flexDirection={"column"}>
              {courses.map((course, i) => (
                <Grid item key={i}>
                  <DashboardCourseCard course={course} isCreator={user.creator} reloadCallback={triggerReload}/>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
}

