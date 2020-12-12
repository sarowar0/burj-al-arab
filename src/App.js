import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Book from "./Components/Book/Book";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path='/home'>
            <Home></Home>
          </Route>

          <Route path='/room'>
            <Home></Home>
          </Route>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <PrivateRoute path='/book/:bedType'>
              <Book></Book>
          </PrivateRoute>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;