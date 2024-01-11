import React, { useContext, useState } from "react";
import { Grid, Box, Button, Icon } from "@mui/material";
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../util.jsx";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { ReceiptRounded, Settings } from "@mui/icons-material";
import { adminStore } from "./AdminDataManager.jsx";

export default function AdminCourseActions() {
  let admin = useContext(adminStore),
    course = admin.currentCourseEdit;
  let [isDeleting, setIsDeleting] = useState(false);
    if (!course) return;

  let handleDelete = createDeleteHandler(setIsDeleting);
  let handlePublish = createUnpublishHandler(course, (course) =>
    admin.set("currentCourseEdit", course)
  );

  function handleBlock() {
    blockUser(course.creator).then((userData) => {
      let newList = admin.creators.map((user) =>
        user.id == course.creator ? { ...user, ...userData } : user
      );
      admin.set("creators", newList);
    });

  }
  let creatorData = admin?.creators?.find(user => user.id == course.creator)
console.log(creatorData);
  return !isDeleting ? (
    <div id="act">
      <h3>פעולות</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Button>
          <a
            style={CANCEL_A_TAG_DEFAULT_STYLE}
            target="_blank"
            href={`/course/${course.id}`}
          >
            צפה בקורס
          </a>
        </Button>
        <Button onClick={handlePublish}>
          {course.isPublished ? "unpublish" : "publish"}
        </Button>
        <Button onClick={handleDelete}>{"delete"}</Button>
        <Button onClick={handleBlock}>{creatorData?.isBlocked ? 'unBlock' : 'block'} creator</Button>

      </div>
    </div>
  ) : (
    <Box>
      <h4>deleting...</h4>
      <Icon className="rotate">
        <Settings />
      </Icon>
    </Box>
  );
}
function createDeleteHandler(setIsDeleting = () => undefined) {
  return function handleDelete() {
    if (
      confirm(
        "This action is irreversible! Are you sure you want to continue?"
      ) &&
      confirm("are you realy shore?!")
    ) {
      setIsDeleting(true);
      deleteCourse(course)
        .then(() =>
          confirm("reload data?") ? (window.location.href += "") : ""
        )
        .catch((err) => console.error(err) + alert("changes not saved!"))
        .finally(() => setIsDeleting(false));
    }
  };
}
function createUnpublishHandler(course, setCourse) {
  return function handlePublish() {
    unpublishCourse(course)
      .then(setCourse)
      .catch((err) => console.error(err) + alert("changes not saved!"));
  };
}
async function unpublishCourse(course) {
  let docRef = doc(getFirestore(), "courses", course.id);
  await updateDoc(docRef, { isPublished: !course.isPublished });
  return { ...course, isPublished: !course.isPublished };
}
async function deleteCourse(course) {
  await deleteAllChapters(course.id);
  let docRef = doc(getFirestore(), "courses", course.id);
  await deleteDoc(docRef);
  return true;
}
async function deleteAllChapters(courseId) {
  let chaptersRef = collection(getFirestore(), "courses", courseId, "chapters");
  let chapters = await getDocs(chaptersRef);
  for (let { id } of chapters.docs) {
    await deleteAllComponents(courseId, id);
    let chapterRef = doc(getFirestore(), "courses", courseId, "chapters", id);
    await deleteDoc(chapterRef);
  }
  return true;
}
async function deleteAllComponents(courseId, chapterId) {
  let componentsRef = collection(
    getFirestore(),
    "courses",
    courseId,
    "chapters",
    chapterId,
    "components"
  );
  let components = await getDocs(componentsRef);

  for (let { id } of components.docs) {
    let componentRef = doc(
      getFirestore(),
      "courses",
      courseId,
      "chapters",
      chapterId,
      "components",
      id
    );
    await deleteDoc(componentRef);
  }
  return true;
}
async function blockUser(uid) {
  let userRef = doc(getFirestore(), "users", uid);
  let userSnapshot = await getDoc(userRef);
  let userData = userSnapshot.data();
  let update = await updateDoc(userRef, { isBlocked: !userData.isBlocked });
  return {isBlocked: !userData.isBlocked};
}
