import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router basename="/">
      {/* && = 단축평가 */}
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
};
export default AppRouter;
