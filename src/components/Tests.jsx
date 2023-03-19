import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getAllCourses, getChapter, getCourse, getCoursesByUserId } from "./FirebaseContext";

export default function Tests() {
  const [coursesList, setCoursesList] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [chaptes, setChapters] = useState([]);
  const [chapterID, setChapterID] = useState("");
  const [components, setComponents] = useState([]);
  const [componentID, setComponentID] = useState('');

  useEffect(() => {
    getCoursesByUserId('system').then((data) => setCoursesList(data.docs));
  }, []);
  useEffect(() => {
        if (!courseID) return;
        setChapters([]);
        getCourse(courseID).then((data) => setChapters(data.docs));
  }, [courseID])
  
  useEffect(() => {
    if (!chapterID) return;
    setComponents([]);
    setComponentID('');
    getChapter(courseID, chapterID).then((data) => setComponents(data.docs));
}, [chapterID])
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

