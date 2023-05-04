import { CircularProgress, Container, Typography } from "@mui/material";
import React from "react";

export default function StandartLoadingPage({ primary, secondary }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: "3rem",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {primary || ""}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {secondary || ""}
      </Typography>
      <CircularProgress size="5rem" />
    </Container>
  );
}
