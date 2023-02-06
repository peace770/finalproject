
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import {siteName} from '../../App'

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "var(--light)",
        color: "var(--navy)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="xl">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography  variant="h5">
              {siteName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography  variant="subtitle1">
              {`${new Date().getFullYear()} `}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;