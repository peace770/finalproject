import React from "react";
import { Grid, Box, Button } from "@mui/material";
import AdminCourseActions from "./AdminCourseActions";
import { getAuth } from "firebase/auth";

export default function AdminCourseEdit({ course, setCourse }) {
  return (
    <div>
      <h1>קורס נבחר: {course ? course.name : ""}</h1>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h6>תיאור:</h6>
          <p>{course?.description}</p>
        </Grid>
        <Grid item xs={4}>
          <AdminCourseActions course={course} setCourse={setCourse} />
        </Grid>
      </Grid>
    </div>
  );
}
