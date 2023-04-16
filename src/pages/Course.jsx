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

export default function Course() {
  const user = React.useContext(LoginContext);

  const [course, setCourse] = useState(null);
  const [userCourseData, setUserCourseData] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);

  const navigate = useNavigate();
  let { courseId, componentId } = useParams();

  if (!courseId || !componentId) {
    return <NotFound404 />;
  }

  if (!course || courseId != course.id) {
    CourseClass.buildCourse(courseId).then((data) => setCourse(data));
    if (!user.creator)
    CourseClass.getUserCourseData(user.uid, courseId).then(data => setUserCourseData(data.data()))
    return <></>;
  }

  if (!currentComponent || componentId != currentComponent.id) {
    let found = false;
    course.chapters.forEach((chapter) => {
      chapter.components.forEach((component) => {
        if (component.id == componentId) {
          found = true;
          setCurrentComponent(component);
        }
      });
    });
    if (!found) throw new Error("component not found");
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

  return course ? (
    <Box sx={{marginTop:'2.5rem'}}>
      <CourseNavigetionSideMenu course={course} lessonsLearned={userCourseData.lessonsLearned || []} />
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
  ) : (
    <h1>wait!</h1>
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
