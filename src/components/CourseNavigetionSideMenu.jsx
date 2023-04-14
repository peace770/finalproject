import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../util";

export default function CourseNavigetionSideMenu({ course }) {
  return (
    <List
      sx={{ position: "absolute" }}
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {course.name}
        </ListSubheader>
      }
    >
      {course.chapters.map((chapter) => (
        <ChapterMenuItemWithSubMenu chapter={chapter} />
      ))}
    </List>
  );
}

function ChapterMenuItemWithSubMenu({ chapter }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={chapter.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chapter.components.map((component) => (
            <ListItemLink
              primary={component.name}
              href={`/view/${chapter.course.id}/${chapter.id}/${component.id}`}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function ListItemLink({ primary, href }) {
  return (
    <ListItem>
      <Link to={href} style={CANCEL_A_TAG_DEFAULT_STYLE}>
          <ListItemText primary={primary} style={{underline:"hover"}} />
      </Link>
    </ListItem>
  );
}
