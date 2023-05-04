import React, { useContext, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
  ListItemIcon,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../util";
import { Course, LoginContext } from "./FirebaseContext";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import EditFormDialog from "./EditFormDialog";
import AddIcon from "@mui/icons-material/Add";

export default function CourseNavigetionSideMenu({ course }) {
  const user = React.useContext(LoginContext);
  const [lessonsLearned, setLessonsLearned] = useState(null);
  const [objectToChange, setObjectToChange] = useState(null);

  if (lessonsLearned === null && !user.creator) {
    Course.getUserCourseData(user.uid, course.id).then((doc) =>
      setLessonsLearned(doc.data().lessonsLearned)
    );
  }

  function editChapter(chapter) {
    console.log(chapter.name);
    setObjectToChange(chapter);
  }

  function editComponent(component) {
    console.log(component.name);
    setObjectToChange(component);
  }

  function chapterAddOn(chapter) {
    if (user.creator) {
      return (
        <>
          <Button
            sx={{ minWidth: "0px" }}
            startIcon={<EditIcon />}
            onClick={() => editChapter(chapter)}
          ></Button>
          <Button onClick={() => chapter.new()}>
            <AddIcon />
          </Button>
        </>
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
      return lessonsLearned != null && lessonsLearned.includes(component.id) ? (
        <DoneOutlineIcon />
      ) : (
        <></>
      );
    }
  }
  return (
    <List
      // sx={{ position: "absolute" }}
      component="nav"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ display: "flex" }}
        >
          <Typography flexGrow={1}>ניווט בקורס</Typography>
          {chapterAddOn(course)}
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
      <EditFormDialog obj={objectToChange} setObj={setObjectToChange} />
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
      <ListItem button>
        {/* <Container sx={{ display: "contents" }} onClick={handleClick}> */}
        <Button onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Typography flexGrow={1} textAlign={'start'}>{chapter.name}</Typography>
        {chapterAddOn(chapter)}
        {/* </Container> */}
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
