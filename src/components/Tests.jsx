import React, { useEffect, useState } from "react";
import { getAllCourses, getChapter, getCourse } from "./FirebaseContext";

export default function Tests() {
  const [coursesList, setCoursesList] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [chaptes, setChapters] = useState([]);
  const [chapterID, setChapterID] = useState("");
  const [components, setComponents] = useState([]);
  const [componentID, setComponentID] = useState('');

  useEffect(() => {
    getAllCourses().then((data) => setCoursesList(objToArray(data)));
  }, []);
  useEffect(() => {
        if (!courseID) return;
        setChapters([]);
        getCourse(courseID).then((data) => setChapters(objToArray(data)));
  }, [courseID])
  
  useEffect(() => {
    if (!chapterID) return;
    setComponents([]);
    setComponentID('');
    getChapter(courseID, chapterID).then((data) => setComponents(objToArray(data)));
}, [chapterID])
console.log(components);
  return (
    <div style={{padding:'3rem'}}>
      <h1>test</h1>
      <div>
        {coursesList.map((course) => boxData(course, setCourseID, "course"))}
      </div>
      <div>
        {chaptes.map(chapter => boxData(chapter, setChapterID, "chapter"))}
      </div>
      <div>
        {components.map(c => boxData(c, setComponentID, 'component'))}
      </div>
      <div>
        {
            <h2>{components.filter(c => c.id == componentID)[0]?.data()?.url}</h2>
        }
      </div>
    </div>
  );
}
function objToArray(obj){
    let list = [];
    obj.forEach((item) => list.push(item));
    return list
}
function boxData(data, setIdOnClick, type) {
    return (
        <div>
          <p>id: {data.id}</p>
          <p>name: {data.data().name}</p>
          <button onClick={() => setIdOnClick(data.id)}>
            select this {type}
          </button>
        </div>
      )
    
}

