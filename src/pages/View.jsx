import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseNavigetionSideMenu from "../components/CourseNavigetionSideMenu";
import { Course } from "../components/FirebaseContext";
import { useParams } from "react-router-dom";
import VideoContent from "../components/Personal/VideoContent";

export default function View() {
  const [course, setCourse] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);

  const { courseId, chapterId, componentId } = useParams();

  if (!course || courseId != course.id) {
    Course.buildCourse(courseId).then((data) => setCourse(data));
  } else if (
    !currentComponent ||
    chapterId != currentComponent.chapter.id ||
    componentId != currentComponent.id
  ) {
    let chapter = course.chapters.find((chapter) => chapter.id == chapterId);
    if (!chapter) throw new Error("chapter not found");

    let component = chapter.components.find((c) => c.id == componentId);
    if (!component) throw new Error("component not found");

    setCurrentComponent(component);
  }
  return course ? (
    <Box>
      <CourseNavigetionSideMenu course={course} />
      {currentComponent ? (
        <VideoContent videoId={youtube_parser(currentComponent.url)} />
      ) : (
        <></>
      )}
    </Box>
  ) : (
    <h1>wait!</h1>
  );
}

function youtube_parser(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
}
