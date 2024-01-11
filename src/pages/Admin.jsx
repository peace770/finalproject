import React, { useContext, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AdminCoursesList from "../components/AdminCoursesList";
import AdminCourseEdit from "../components/AdminCourseEdit";
import Provider, { adminStore } from "../components/AdminDataManager";

 function Admin() {

  let store = useContext(adminStore);

  return (
    <Container sx={{ display: "flex" }}>
      <Box>
        <AdminCoursesList  />
      </Box>
      <Box>
        <AdminCourseEdit />
      </Box>
    </Container>
  );
}
export default () => <Provider><Admin/></Provider>