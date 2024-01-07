import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { LoginContext } from "./FirebaseContext";

export default function AdminCoursesList({ setCourse }) {
  let user = useContext(LoginContext);
  let [coursesList, setCoursesList] = useState(null);
  let [openMenuItem, setOpenMenuItem] = useState(null);
  if (!coursesList) {
    getCreatorsAndCoourses().then(setCoursesList).catch((err) => console.error(err, user));
  }

  return coursesList ? (
    <div style={{borderLeft: '1px solid rgba(1,1,1,0.5)'}}>
      <h1> יוצרים וקורסים</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.1em", width: '15em'}}>
        {coursesList.map(([creator, courses]) => (
          <div key={creator} style={{ marginBottom: "2em", width: '100%' }}>
            <button
              style={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%',
                borderWidth: "0px",
                background: "none",
                cursor: "pointer",
              }}
              onClick={() =>
                setOpenMenuItem((current) =>
                  current != creator ? creator : null
                )
              }
            >
              <h6 style={{ margin: "0px" }}>{creator}</h6>
            <span style={{ fontWeight: 900 }}>
              {openMenuItem == creator ? "-" : "+"}
            </span>
            </button>
            <div
              style={{
                display: "flex",
                maxHeight: openMenuItem == creator ? '100vh' : '0vh',
                overflow:'hidden',
                flexDirection: "column",
                gap: "0.1em",
                paddingInlineStart: "1em",
              }}
            >
              {courses.map((course) => (
                <button key={course.id} onClick={() => setCourse(course)}>
                  {course.name || course.id}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

async function getCreatorsAndCoourses() {
  let courseSnapshot = await getDocs(collection(getFirestore(), "courses"));
  let creators = {};
  courseSnapshot.forEach((doc) => {
    let data = doc.data(),
      { creator } = data;
    if (!creators[creator]) creators[creator] = [];
    creators[creator].push({ id: doc.id, ...data });
  });
  return Object.entries(creators);
}
