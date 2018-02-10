import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import styles from './nav.module.css'
import logo from '../images/logo-small.png'



export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand className={styles.brand} href="/">
            <img src={logo} alt="Logo" className="img-fluid" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Ingredient analysis</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/porosity">Porosity quiz</NavLink>
              </NavItem>

              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Product Recs
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem href="/cg-lite">
                    Light/Low-Porosity
                  </DropdownItem>
                  <DropdownItem href="/high-porosity">
                    Heavy/High-Porosity
                  </DropdownItem>
                 <DropdownItem href="/normal-porosity">
                    Normal-Porosity
                  </DropdownItem>
                  <DropdownItem href="/dye">
                    Dyes
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Etc
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem href="/about">
                    About
                  </DropdownItem>
                  <DropdownItem href="/shea">
                    Non-CG Shea Moisture Products
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
