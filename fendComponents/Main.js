import React, { Fragment } from "react";
import { Paper, Typography } from "@material-ui/core";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ArenaList from "./../component/ArenaList";
import Home from "../component/TableOfReservation";
import Arena from "./../fendComponents/Arena/index";
const thisURL="/arena"
export default function(props) {
  return (
    <Fragment>
      <div className={props.classes.toolbar} />
      <Paper style={{ height: "200%" }}>
        <Route
          exact
          path="/"
          render={props => <Home {...props} arena="pkr1" />}
        />
        <Route
          path="/aboutus"
          render={() => (
            <Fragment>
              <Typography variant="h3">About Us</Typography>
            </Fragment>
          )}
        />

        <Route exact path="/arena" render={props => <ArenaList {...props} />} />

        <Route
            path={`${thisURL}/:arenaId`}
            render={props => <Arena {...props} />}
          />
      </Paper>
    </Fragment>
  );
}
