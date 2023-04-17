import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseNavigetionSideMenu from "../components/CourseNavigetionSideMenu";
// import { Course as CourseClass } from "../components/FirebaseContext";
import { useHref, useNavigate, useParams } from "react-router-dom";
import VideoContent from "../components/Personal/VideoContent";
import NotFound404 from "./NotFound404";
import {
  Course as CourseClass,
  LoginContext,
} from "../components/FirebaseContext";
import Editable from "../components/Editable";

export default function Course() {
  const user = React.useContext(LoginContext);

  const [course, setCourse] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);
  const navigate = useNavigate();
  let { courseId, componentId } = useParams();

  if (!courseId) {
    navigate("/404");
  }

  if (!course || courseId != course.id) {
    CourseClass.buildCourse(courseId).then((data) => setCourse(data));
    return <h6>loading</h6>;
  }
  if ( !componentId) {
    componentId = course.chapters[0].components[0].id;
    navigate(`/course/${courseId}/${componentId}`)
  }

  if (!currentComponent || componentId != currentComponent.id) {
    let found = false;
    course.componentsIterator((component) => {
      if (component.id == componentId) {
        found = true;
        setCurrentComponent(component);
      }
    });
    if (componentId && !found)     navigate("/");
  }

  function handleNext() {
    let next = getNextComponent(currentComponent);
    if (next) {
      let newUrl = `/course/${course.id}/${next.id}`;
      navigate(newUrl);
    }
  }
  function handlePrev() {
    let prev = getPrevComponent(currentComponent);
    if (prev) {
      let newUrl = `/course/${course.id}/${prev.id}`;
      navigate(newUrl);
    }
  }

  return  (
    <Box sx={{ marginTop: "2.5rem" }}>
      <CourseNavigetionSideMenu
        course={course}
        lessonsLearned={[]}
      />
      {currentComponent ? (
        <>
          <VideoContent videoId={youtube_parser(currentComponent.url)} />

          <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="outlined" onClick={handlePrev}>
              {`<`} Previw
            </Button>
            <Button variant="outlined" onClick={handleNext}>
              Next {`>`}
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

function getPrevComponent(current) {
  let course = current.chapter.course;
  let arr = [];
  course.chapters.forEach((chapter) => {
    chapter.components.forEach((component) => arr.push(component));
  });
  let nextIndex = arr.indexOf(current) - 1;
  return arr[nextIndex];
}

function getNextComponent(current) {
  let course = current.chapter.course;
  let arr = [];
  course.chapters.forEach((chapter) => {
    chapter.components.forEach((component) => arr.push(component));
  });
  let nextIndex = arr.indexOf(current) + 1;
  return arr[nextIndex];
}

function youtube_parser(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
}
