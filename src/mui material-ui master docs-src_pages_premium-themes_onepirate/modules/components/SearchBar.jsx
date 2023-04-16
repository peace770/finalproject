import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar({courseList, search, setSearch}) {
  console.log(courseList);
  return (
  
    <Autocomplete
    sx={{backgroundColor:"#f4f8ff5c"}}
    freeSolo
    fullWidth 
    id="free-solo-2-demo"
    disableClearable
    options={courseList.map((option) => option.name)}
    renderInput={(params) => (
      <TextField variant="outlined" value={search} placeholder="אין בית מדרש בלא חידוש..."
        {...params}
        // label = "search"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    )}
  />
  )
}

  