import React from "react";
import "../scss/Navbar.scss";
import logo from "../assets/images/y18.gif";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="header-w">
      <a href="/">
        <img className="logo" src={logo} alt="logo"></img>
      </a>
      <ul className="header-list">
        <a className="header-name" href="/">
          <b>Hacker News</b>
        </a>
        |
        <Link to="/new" className="header-name">
          new
        </Link>
        |
        <a className="header-name" v href="/top">
          top
        </a>
        |
        <a className="header-name" href="/best">
          best
        </a>
        |
        <a className="header-name" href="/comments">
          comments
        </a>
      </ul>
    </div>
  );
}

export default Navbar;
