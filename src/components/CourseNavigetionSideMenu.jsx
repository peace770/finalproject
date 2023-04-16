import React, { useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../util";

export default function CourseNavigetionSideMenu({ course, lessonsLearned }) {
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
        <ChapterMenuItemWithSubMenu
          key={chapter.position}
          chapter={chapter}
          lessonsLearned={lessonsLearned}
        />
      ))}
    </List>
  );
}

function ChapterMenuItemWithSubMenu({ chapter, lessonsLearned }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={chapter.name}  style={{  textAlign:'start', gap:'3em' }}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chapter.components.map((component) => (
            <ListItemLink
              key={component.position}
              primary={component.name}
              href={`/course/${chapter.course.id}/${component.id}`}
              mark={lessonsLearned.includes(component.id)}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function ListItemLink({ primary, href, mark }) {
  return (
    <Link to={href} style={CANCEL_A_TAG_DEFAULT_STYLE}>
      <ListItem  style={{  textAlign:'start', gap:'3em' }}>
        <ListItemText primary={primary} />
          <ListItemIcon>
        {mark ? (
            <><DoneOutlineIcon /></>
        ) : (
          <div></div>
        )}
          </ListItemIcon>
      </ListItem>
    </Link>
  );
}
