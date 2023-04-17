import React, { useContext, useEffect, useState } from 'react'
import { Course, LoginContext, registerToCourse } from '../components/FirebaseContext'
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { CANCEL_A_TAG_DEFAULT_STYLE } from '../util';


export default function Landing() {
    
    let { courseId } = useParams();
    const user = useContext(LoginContext);
    const userId = user ? user.uid : null;
    
    const [alreadyIn, setAlreadyIn] = useState(false);
    const [creator, setCreator] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [userCourseData, setUserCourseData] = useState(null);
    
      useEffect(() => {
        if (userId) {
          Course.getUserCourses(userId).then((res) => { 
            if (res.find(course => course.id === courseId)) {
              setAlreadyIn(true);
            }
          })
          .then(() => {
            Course.getCourse(courseId)
            .then((data) => data.data())
            .then((data) => {
              setCreator(data.creator);
              setDescription(data.description);
              setName(data.name);
            });
          });
        }
    }, [courseId, userId]);
    
    const handleClick = (()=>{
      var res = registerToCourse(courseId, userId)
      .catch((error)=>{
        alert("Houston ... we've had a problem here");
        console.log(error);
      });
      if (res === true){
        setAlreadyIn(true);
        Course.getUserCourseData(courseId, userId).then(data => setUserCourseData(data.data()));
      }
      if (userCourseData){
        console.log(userCourseData);
      }
    })
    
    const buttonText = alreadyIn ? `רשום לקורס`:`הרשם לקורס`;
  
  return (
    <>
    <Grid container spacing={2} mt={2} mb={2}>
      <Grid item xs={12} sm={6}>
        <Box sx={{marginRight: "1em"}}>
          <Typography variant="h4" gutterBottom>{`${name}.`}</Typography>
          <Typography variant='h6' gutterBottom>{`נוצר על ידי ${creator}.`}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{m:1}}>
          <Button variant="contained"  size="large" onClick={handleClick} disabled={alreadyIn}>{buttonText}</Button>
        </Box>
        <Box sx={{m:1}}>
          <Link to={`/course/${courseId}`} style={ CANCEL_A_TAG_DEFAULT_STYLE}><Button variant="contained" size="large" onClick={handleClick} disabled={!alreadyIn}>נתחיל ללמוד</Button></Link>
        </Box>
      </Grid>
    </Grid>
    <Box sx={{mr: 1}}>
        <Typography variant="body1" gutterBottom>{`${description}.`}</Typography>
    </Box>
    </>
  )
}
