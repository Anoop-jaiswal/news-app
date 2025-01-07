import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle drawer state
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // Drawer Content
  const drawerContent = (
    <Box
      sx={{
        width: { xs: 250, sm: 300, lg: 260 },
        backgroundColor: "#fafafa", // Light background for the drawer
        height: "100vh", // Full height
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Close button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton
          color="inherit"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Drawer Title */}
      <Box sx={{ p: 2, backgroundColor: "#1976d2", color: "white" }}>
        <Typography variant="h6">Menu</Typography>
      </Box>

      {/* Divider for separation */}
      <Divider />

      {/* Menu List */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List>
          <ListItem button onClick={toggleDrawer(false)}>
            <HomeIcon sx={{ mr: 2 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <PersonIcon sx={{ mr: 2 }} />
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <SettingsIcon sx={{ mr: 2 }} />
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ExitToAppIcon sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, color: "black", mt: "auto" }}>
        <Typography variant="body2" align="center">
          © 2025 My App
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)} // Open drawer on click
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left" // Sidebar opens from the left
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;
