import { Box } from "@mui/system";
import React from "react";
import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";

export default function Personal({ children }) {
  return (
    <Box id="Personal" sx={{minHeight:'100vh', display: "flex", flexDirection: "column" , maxWidth:'100vw'}}>
      <ResponsiveAppBar />
      <Box component="section" sx={{ flex: "1" , display:'flex', overflow: 'scroll'}}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
