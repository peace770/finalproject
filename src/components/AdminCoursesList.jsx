import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "./FirebaseContext";
import { adminStore } from "./AdminDataManager";

export default function AdminCoursesList() {
  let user = useContext(LoginContext);
  let admin = useContext(adminStore);
  let [coursesList, setCoursesList] = useState(null);
  let [openMenuItem, setOpenMenuItem] = useState(null);
  let setCourse = (course) => admin.set("currentCourseEdit", course);
  useEffect(() => {
    getCourses()
      .then((data) => admin.set("courses", data))
      .catch((err) => console.error(err, user));
  }, [!!admin.courses == false]);
  useEffect(() => {
    setCoursesList(mapCoursesToCreators(admin.courses));
  }, [admin.courses]);
  useEffect(() => {
    getCreators().then(creatorsList => admin.set('creators', creatorsList))
  }, [!!admin.creators == false])

  return coursesList ? (
    <div style={{ borderLeft: "1px solid rgba(1,1,1,0.5)" }}>
      <h1> יוצרים וקורסים</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.1em",
          width: "15em",
        }}
      >
        {coursesList.map(([creator, courses]) => (
          <div key={creator} style={{ marginBottom: "2em", width: "100%" }}>
            <button
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                borderWidth: "0px",
                background: admin?.creators?.find(user => user.id == creator)?.isBlocked ? 'red' : "none",
                cursor: "pointer",
              }}
              onClick={() =>
                setOpenMenuItem((current) =>
                  current != creator ? creator : null
                )
              }
            >
              <h6 style={{ margin: "0px"  }}>{creator}</h6>
              <span style={{ fontWeight: 900 }}>
                {openMenuItem == creator ? "-" : "+"}
              </span>
            </button>
            <div
              style={{
                display: "flex",
                maxHeight: openMenuItem == creator ? "100vh" : "0vh",
                overflow: "hidden",
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

async function getCourses() {
  let courseSnapshot = await getDocs(collection(getFirestore(), "courses"));
  let arr = [];
  courseSnapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
  return arr;
}
async function getCreators() {
  let usersRef = collection(getFirestore(), "users");
  let creatorsQuery = query(usersRef, where("creator", "==", true));
  let creatorsSnapshot = await getDocs(creatorsQuery);
  let res = [];
  creatorsSnapshot.forEach((doc) => res.push({ id: doc.id, ...doc.data() }));
  return res;
}
function mapCoursesToCreators(courses) {
  if (!Array.isArray(courses)) return null;
  let creators = {};
  courses.forEach((course) => {
    let { creator } = course;
    if (!creators[creator]) creators[creator] = [];
    creators[creator].push(course);
  });
  return Object.entries(creators);
}
