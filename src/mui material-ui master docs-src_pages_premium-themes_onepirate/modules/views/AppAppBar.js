import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { getAuth } from "firebase/auth";
import { signInWithGoogle , LoginContext, signOutUser} from "../../../components/FirebaseContext";
import {Link} from 'react-router-dom'
import { CANCEL_A_TAG_DEFAULT_STYLE } from "../../../util";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function AppAppBar() {
let user = React.useContext(LoginContext);
console.log(user);
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link to="/" style={CANCEL_A_TAG_DEFAULT_STYLE}>
          <Typography
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
          >
            {"onepirate"}
          </Typography>
          </Link>
          {user ? <UserMenu/> : <SignInUp/>}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
function UserMenu(){
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {handleCloseUserMenu(); signOutUser()}}>
                  <Typography textAlign="center" >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
  )
}
function SignInUp() {
  
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link to={'/signin'} style={CANCEL_A_TAG_DEFAULT_STYLE}>
            <Typography 
              color="inherit"
              variant="h6"
              underline="none"
              sx={rightLink}
            >
              {"Sign In"}
            </Typography>
            </Link>
            <Link to={'/signup'} style={CANCEL_A_TAG_DEFAULT_STYLE}>
            <Typography
              variant="h6"
              underline="none"
              sx={{ ...rightLink, color: "secondary.main" }}
            >
              {"Sign Up"}
            </Typography>
            </Link>
          </Box>
  )
  
}
export default AppAppBar;
