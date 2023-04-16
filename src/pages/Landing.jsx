import React from 'react'
import { Course } from '../components/FirebaseContext'

export default function Landing() {
    let { coruseId } = useParams();
    Course.getCourse(coruseId)
    console.log(coruseId);
  return (
    <>

    </>
  )
}
