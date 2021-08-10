import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div>
        {/* <header>
          <Link to="/about">About</Link> <Link to="/">Login</Link>{" "}
          <strong>react-router-dom-example</strong>
        </header> */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/movie/:id" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
