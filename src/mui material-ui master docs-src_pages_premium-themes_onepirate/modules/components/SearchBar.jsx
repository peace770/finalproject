import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link, useNavigate } from 'react-router-dom';
import { CANCEL_A_TAG_DEFAULT_STYLE } from '../../../util';

export default function SearchBar({courseList, search, setSearch}) {
  let navigate = useNavigate();

  const handleKeyDown = (event) => {
    console.log(event);
    if (event.key === 'Enter') {
      const course = courseList.find((c) => c.name === event.target.value);
      console.log(course);
      if (course) {
        event.preventDefault(); 
        setSearch('');
        navigate(`coursepage/${course.id}`);
      }
    }
  };

  return (
    <Autocomplete
    sx={{backgroundColor:"#f4f8ff5c"}}
    freeSolo
    fullWidth 
    id="free-solo-2-demo"
    disableClearable
    options={courseList.filter((option)=> option.name.includes(search)).map((option) => option.name)}
    renderInput={(params) => (
      
      <TextField variant="outlined" value={search} placeholder="אין בית מדרש בלא חידוש..."
        {...params}
        InputProps={{
          ...params.InputProps,
          type: 'search',
          onKeyDown : handleKeyDown,
        }}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        
      />
    )}
  />
  )
}