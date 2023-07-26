// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
//   list: {
//     width: 250,
//   },
// }));

// function NavMenu() {
//   const classes = useStyles();
//   const [openDrawer, setOpenDrawer] = useState(false);

//   const toggleDrawer = () => {
//     setOpenDrawer(!openDrawer);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="black"
//             aria-label="menu"
//             onClick={toggleDrawer}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography sx={{color: 'black'}} variant="h6" className={classes.title}>
//             My Website
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
//         <List className={classes.list}>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemText primary="About" />
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemText primary="Services" />
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemText primary="Contact" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </div>
//   );
// }

// export default NavMenu;