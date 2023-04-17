import React, { useContext, useState } from "react";
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
import { Course, LoginContext } from "./FirebaseContext";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import FormDialog from './FormDialog'




export default function CourseNavigetionSideMenu({ course,  }) {
  const user = React.useContext(LoginContext);
  const [lessonsLearned, setLessonsLearned] = useState(null);
  const [objectToChange, setObjectToChange] = useState(null);


  if (lessonsLearned === null && !(user.creator)){
    Course.getUserCourseData(user.uid, course.id).then(doc => setLessonsLearned(doc.data().lessonsLearned));
  }

  function editChapter(chapter) {
    console.log(chapter.name);
    setObjectToChange(chapter)
  }

  function editComponent(component) {
    console.log(component.name);
    setObjectToChange(component)
  }

  function chapterAddOn(chapter) {
    if (user.creator) {
      return (
        <Button onClick={() => editChapter(chapter)}>
          {/* <Icon sx={{}}> */}
            <EditIcon />
          {/* </Icon> */}
        </Button>
      );
    } else {
      return <></>;
    }
  }
  function componentAddOn(component) {
    if (user.creator) {
      return (
        <Button onClick={() => editComponent(component)}>
            <EditIcon />
        </Button>
      );
    } else {
      return (lessonsLearned != null && lessonsLearned.includes(component.id) ? <DoneOutlineIcon /> : <></>);
    }
  }
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
          chapterAddOn={chapterAddOn}
          componentAddOn={componentAddOn}
        />
      ))}
            <FormDialog obj={objectToChange} setObj={setObjectToChange}/>

    </List>
  );
}
//chapter addon
function ChapterMenuItemWithSubMenu({ chapter, chapterAddOn, componentAddOn }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText
          primary={chapter.name}
          style={{ textAlign: "start", gap: "3em" }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
        {chapterAddOn(chapter)}
      </ListItem>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ paddingInlineStart: "1em" }}
      >
        <List component="div" disablePadding>
          {chapter.components.map((component) => (
            <ListItemLink
              key={component.position}
              primary={component.name}
              href={`/course/${chapter.course.id}/${component.id}`}
              addOn={componentAddOn(component)}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function ListItemLink({ primary, href, addOn }) {
  return (
    <Link to={href} style={CANCEL_A_TAG_DEFAULT_STYLE}>
      <ListItem style={{ textAlign: "start", gap: "3em" }}>
        <ListItemText primary={primary} />
        {addOn}
      </ListItem>
    </Link>
  );
}
