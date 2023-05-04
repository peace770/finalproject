import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../util";
import { cancelCourseSubscription } from "./FirebaseContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function DashboardCourseCard({
  course,
  isCreator,
  reloadCallback,
}) {
  function handleUnsubscribe() {
    cancelCourseSubscription(course.id).then(() =>
      reloadCallback
        ? reloadCallback()
        : window.location.assign(window.location.href)
    );
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Box sx={{ width: 128, height: 128 }}>
            {course.image ? (
              <Img alt="Course Image" src={course.image} />
            ) : (
              <></>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {course.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {course.creatorName || ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description || ""}
              </Typography>
            </Grid>
            <Grid item>
              {course.isPublished || isCreator ? (
                <Link
                  to={`/course/${course.id}/${course.lastComponent || ""}`}
                  style={CANCEL_A_TAG_DEFAULT_STYLE}
                >
                  <Typography variant="subtitle1" component="div">
                    {isCreator ? "ערוך" : "הצג"} קורס
                  </Typography>
                </Link>
              ) : (
                <Button disabled>
                  היוצר של הקורס הזה הסיר אותו מפירסום ולא ניתן לגשת אליו
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid item>
            {!isCreator ? (
              <Button onClick={handleUnsubscribe}>
                <DeleteForeverIcon titleAccess="הסר הרשמה מקורס" />
              </Button>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
