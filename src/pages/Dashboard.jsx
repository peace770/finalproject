import { Box, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { Course, LoginContext, redirectIfUserNotSignedUp } from '../components/FirebaseContext';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Dashboard() {
  const user = useContext(LoginContext);
  //redirectIfUserNotSignedUp(user);

  const [courses, setCourses] = useState([]);
  
  useEffect(() =>{
    Course.getAllCourses().then((res) => {
      let arr = [];
      res.forEach(data => arr.push(data.data()));
      setCourses(arr);
    })
  }, []);

  return (
     <Box>
        <Typography
        variant='h4'
        >
          My Courses
        </Typography>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((course, i) => (
              <Grid item key={i} >
                <Card
                  sx={{  height: '150px', display: 'flex', flexDirection: 'row', flexWrap:'nowrap' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height:'100%',
                      objectFit: 'contain',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course._name}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </Box>
  )
}
