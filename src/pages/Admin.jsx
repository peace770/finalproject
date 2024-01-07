import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AdminCoursesList from "../components/AdminCoursesList";
import AdminCourseEdit from "../components/AdminCourseEdit";

export default function Admin() {
  let [currentCourseEdit, setCurrentCourseEdit] = useState(null);

  return (
    <Container sx={{ display: "flex" }}>
      <Box>
        <AdminCoursesList course={currentCourseEdit} setCourse={setCurrentCourseEdit} />
      </Box>
      <Box>
        <AdminCourseEdit course={currentCourseEdit} setCourse={setCurrentCourseEdit}/>
      </Box>
    </Container>
  );
}
