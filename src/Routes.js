import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containersLogin/Login";
import Signup from "./containers/Signup/Signup";
import NotFound from "./containers/NotFound/NotFound";
import ArticleSubmission from "./containers/Forms/ArticleSubmission";
import Search from "./containers/Search/Search"

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/articlesubmission">
        <ArticleSubmission />
      </Route>

      <Route exact path="/search">
        <Search />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
