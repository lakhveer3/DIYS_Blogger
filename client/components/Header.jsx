import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
const { Link, Redirect } = require("react-router");
export default class Header extends Component {
  constructor() {
    super();
    this.state = { activeItem: "", redirectHome: false };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name, redirectHome: true });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        {/* <Link to="/"> */}
        {this.state.redirectHome ? <Redirect to="/" /> : ""}
        <a className="siteName">
          <Menu.Item
            name="ADD TO CART"
            onClick={this.handleItemClick.bind(this)}
            style={{
              fontFamily: "Sitka Banner",
              color: "black",
              fontWeight: "bold",
              fontSize: "24"
            }}
          />
        </a>
        {/* </Link> */}
        <Menu.Menu position="right">
          <Menu.Item className="menu">
            <img
              src="../assets/images/Wipro-Logo.png"
              title="powered by Wipro"
              alt="Wipro Logo"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
