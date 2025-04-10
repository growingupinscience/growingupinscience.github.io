import React, { useState, useEffect } from 'react';
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
import { Link } from "gatsby";
import '../css/style.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobileMenuContent') && 
          !event.target.closest('.mobileMenuButton')) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const menuitems = [
    { name: "Home", link: "/" },
    { name: "Recent", link: "/#recent-events" },
    { name: "About", link: "/#about" },
    { name: "Events", link: "/events/" },
    { name: "Chapters", link: "/chapters/" },
    { name: "Participate", link: "/participate/" },
  ];

  return (
    <>
      <button 
        className={`mobileMenuButton ${isOpen ? 'active' : ''} mobile-only`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobileMenuOverlay ${isOpen ? 'active' : ''} mobile-only`}>
        <div className="mobileMenuContent"> 
          {menuitems.map((item, index) => (
            <div key={index} className="mobileMenuItemContainer">
              <Link 
                to={item.link}
                onClick={closeMenu}
                className="mobileMenuItem"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="menu desktop-only">
        <Navbar expand="md" light>
          <Nav navbar>
            {menuitems.map((item, index) => (
              <NavItem key={index} className="menuitem">
                <Link to={item.link}>{item.name}</Link>
              </NavItem>
            ))}
          </Nav>
        </Navbar>
      </div>
    </>
  );
}

export default Menu;
