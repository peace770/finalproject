import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function SourceContent({ content }) {
  return (
    <Box
    sx={{
    }}>
        <Box
      sx={{
        width:{md:'40vw'},
        backgroundColor: "antiquewhite",
        padding: "2rem",
        marginInlineStart:'5vw',
        border: "0.1rem solid",
      }}
    >
      <Typography textAlign={'justify'}>{content}</Typography>
    </Box>
    </Box>
  );
}
