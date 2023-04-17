import React from "react";
import Box from "@mui/material/Box";
import { Icon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LoginContext } from "./FirebaseContext";
import Button from "@mui/material/Button";

export default function Editable({ onClick }) {
  return (
    <Button
      sx={{
        position: "relative",
        display: "contents",
      }}
      onClick={onClick}
    >
      <Icon sx={{}}>
        <EditIcon />
      </Icon>
    </Button>
  );
}
