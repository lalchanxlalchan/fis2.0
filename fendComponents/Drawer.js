import React, { Fragment, useState } from "react";
import {
  Typography,
  Drawer,
  Hidden,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { makeStyles } from "@material-ui/core/styles";
import Main from "./Main";
import { BrowserRouter, Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

export default function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const [buttons, setButtons] = useState({
    buttons: [["Login", "/login"], ["Signup", "/signup"]],
    logout: ["Logout", "/logout"],
    moreButtons: [["Home", "/"], ["Arena", "/arena"], ["About Us", "/aboutUs"]]
  });

  // const [isLogin, setIsLogin] = useState(false);

  // const isLoginHandler = props => {
  //     setIsLogin(!this.isLogin);
  // }

  const drawer = (
    <div style={{ marginTop: 50 }}>
      {/* <Hidden smDown></Hidden> */}
      <Hidden smUp>
        <div
          className={classes.toolbar}
          style={{ backgroundColor: "#003278", color: "white" }}
        >
          <List>
            <Typography variant="h3" align="center">
              FIS
            </Typography>
          </List>
          <Divider />
        </div>
      </Hidden>
      <List>
        {buttons.buttons.map((text, index) => (
          <Link to={text[1]}>
            <Hidden smUp>
              <ListItem button key={text[0]}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text[0]} />
              </ListItem>
            </Hidden>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {buttons.moreButtons.map((text, index) => (
          <Link to={text[1]}>
            <ListItem button key={text[0]}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text[0]} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Main classes={classes} />
      </main>
    </Fragment>
  );
}
