// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import { Button, Link } from "@mui/material";
// import {
//   isUserSignedIn,
//   LoginContext,
//   signInWithGoogle,
//   signOutUser,
// } from "../FirebaseContext";


// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const isUserSignedIn = React.useContext(LoginContext);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

  

// function UserMenuItem(value, href, onClick) {
//   return { value: value, href: href, onClick: onClick };
// }

// const UserMenu = (isUserSignedIn
//   ? [
//       UserMenuItem("Profile", "/Profile", null),
//       UserMenuItem("Account", "/Account", null),
//       UserMenuItem("Dashboard", "/Dashboard", null),
//       UserMenuItem("Logout", null, signOutUser),
//     ]
//   : [UserMenuItem("Sign In With Google", null, signInWithGoogle)]);

//   return (
//     <AppBar
//       position="static"
//       color="inherit"
//       sx={{ backgroundColor: "var(--teal)" }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
//           {/* site name desktop*/}
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: "bolder",
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             {siteName}
//           </Typography>
//           {/* mobile menu */}
//           {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box> */}

//           {/* site name mobile*/}
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             {siteName}
//           </Typography>

//           {/* desktop menu */}
//           {/* <Box sx={{display: { xs: 'none', md: 'flex' },  mr:'auto' }}>
//             {pages.map((page) => (
//               <Link
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'black', display: 'block', padding:'1em',  textDecorationColor: 'rgba(0,0,0, 0)' }}
//               >
//                 {page}
//               </Link>
//             ))}
//           </Box> */}

//           {/* user menu */}
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt={ getUserName()} src={getProfilePicUrl()} />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {UserMenu.map((setting) => (
//                 <MenuItem key={setting.value} 
//                 onClick={handleCloseUserMenu}>
//                   <Link
//                     sx={{ all: "unset" }}
//                     href={setting.href ? setting.href : undefined }
//                     onClick={setting.onClick ? setting.onClick : undefined}
//                   >
//                     <Typography textAlign="center">{setting.value}</Typography>
//                   </Link>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;
