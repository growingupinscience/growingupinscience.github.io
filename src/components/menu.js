import React, { Component } from 'react';
import {Nav, NavItem} from 'reactstrap';
import {Link, withPrefix} from "gatsby"
import '../css/style.css';

class Menu extends Component {
  render() {
    return (
      <div className = "sidenav">
        <Nav vertical>
          <NavItem>
            <Link to={"/"}>Welcome</Link>
          </NavItem>
          <NavItem>
            <Link to={"/#recent-events"}>Events</Link>
          </NavItem>
          <NavItem>
            <Link to={"/#about"}>About</Link>
          </NavItem>
          <NavItem>
            <Link to="#">Global</Link>
          </NavItem>
          <NavItem>
            <Link to={"/stories/"}>Stories</Link>
          </NavItem>
          <NavItem>
            <Link to={"/participate/"}>Participate</Link>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Menu;
