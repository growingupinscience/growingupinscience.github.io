import React, { Component } from 'react';
import {
  Nav, 
  Navbar,
  NavLink,
  NavItem, 
  UncontrolledDropdown, 
  DropdownToggle,
  DropdownMenu,
  NavbarToggler,
  NavbarBrand,
  DropdownItem,
  NavbarText,
  Collapse,
} from 'reactstrap';
import {Link, withPrefix} from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'
import '../css/style.css';
import "../css/mobile.css";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    var menuitems = 
        [
          <NavItem>
            <Link to={"/"}>Welcome</Link>
          </NavItem>,
          <NavItem>
            <Link to={"/#recent-events"}>Recent</Link>
          </NavItem>,
          <NavItem>
            <Link to={"/#about"}>About</Link>
          </NavItem>,
          <NavItem>
            <Link to={"/events/"}>Events</Link>
          </NavItem>,
          <NavItem>
            <Link to={"/chapters/"}>Chapters</Link>
          </NavItem>,
          <NavItem>
            <Link to={"/participate/"}>Participate</Link>
          </NavItem>
        ]

    return (
      <div>
      <div className = "mobile-only mobilenav">
          <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <StaticImage src="../images/menu-button.png" style={{height: "30px", width:"30px"}}/>   
                </DropdownToggle>
                <DropdownMenu right>
                  <Nav vertical>
                  {menuitems}
                  </Nav>
                </DropdownMenu>
          </UncontrolledDropdown>
      </div>
      <div className = "desktop-only topnav">
        <Navbar light>
          <Nav>
          {menuitems}
          </Nav>
        </Navbar>
      </div>
      </div>
    );
  }
}

export default Menu;
