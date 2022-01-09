import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import New from "./components/New";
import Top from "./components/Top";
import Best from "./components/Best";
import Comments from "./components/Comments";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App container">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/new">
            <New />
          </Route>

          <Route exact path="/top">
            <Top />
          </Route>

          <Route exact path="/best">
            <Best />
          </Route>

          <Route exact path="/comments">
            <Comments />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
