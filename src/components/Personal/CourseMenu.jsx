import React, { useState } from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, List, ListItemButton, ListItemText, IconButton } from "@mui/material";



export default function CourseMenu({ children }) {
  const [open, setOpen] = useState(false);
  const [mobileMenueOpen, setMobileMenueOpen] = useState(false);

  return (
    <Box
      sx={{
        zIndex: 1,
        backgroundColor: 'var(--teal)',
        '& > *': {
          backgroundColor:'var(--light)'
        }
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setMobileMenueOpen(!mobileMenueOpen)}
        color="inherit"
        sx={{ display: { xs: "unset", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        sx={{
          display: { xs: mobileMenueOpen ? "unset" : "none", md: "unset" },
        }}
      >
        <Box
          minWidth={"20vw"}
          sx={{
            backgroundColor: "inherit",
          }}
        >
          {children.map((item, index) => (
            <MuiAccordion
              disableGutters
              key={item.title}
              expanded={open === item.title}
              onClick={() => setOpen(open != item.title ? item.title : false)}
            >
              <MuiAccordionSummary>
                <Typography sx={{ fontWeight: 500, fontSize: "1.1rem" }}>{`${
                  index + 1
                }: ${item.title}`}</Typography>
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ paddingInlineStart: "2em" }}>
                <List>
                  {item.content.map((item, innerIndex) => (
                    <ListItemButton>
                      <ListItemText
                        sx={{ textAlign: "right" }}
                        disableTypography
                      >{`${index + 1}.${innerIndex + 1} ${item}`}</ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </MuiAccordionDetails>
            </MuiAccordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
