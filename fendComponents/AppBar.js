import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
  InputBase,
  List,
  CssBaseline,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ResponsiveDrawer from "./Drawer";
import { BrowserRouter, Link } from "react-router-dom";

//styling for appbar
const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    flexGrow: 0.33
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: 70,
      "&:focus": {
        width: 80
      }
    }
  },
  list: {
    [theme.breakpoints.up("sm")]: {
      position: "relative"
    }
  },
  listItem: {
    width: 100,
    display: "inline-flex",
    flexGrow: 0.33
  }
}));

export default function SearchAppBar() {
  //assigning styles objects to classes
  const classes = styles();
  const [mobileOpen, setMobileOpen] = useState(false);

  //when login is clicked
  const goToLogin = event => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = "grey";
  };

  //when signup is clicked
  const goToSignup = event => {
    event.currentTarget.style.backgroundColor = "black";
  };

  //drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar
          className={classes.appBar}
          position="absolute"
          style={{ background: "#003278" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Hidden xsDown>
              <div className={classes.title}>
                <Typography variant="h5" noWrap>
                  Futsal Information System
                </Typography>
              </div>
            </Hidden>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Hidden xsDown>
              <div className={classes.list}>
                <List component="nav">
                  <div className={classes.listItem}>
                    <ListItem button onClick={goToLogin}>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </div>
                  <div className={classes.listItem}>
                    <Link to="/signup">
                      <ListItem button onClick={goToSignup}>
                        <ListItemText primary="Signup" />
                      </ListItem>
                    </Link>
                  </div>
                </List>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
        <ResponsiveDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          classes={classes}
        />
      </div>
    </Fragment>
  );
}
