import React from 'react';
import SearchBar from './search';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false
    };

    this.setToggle = this.setToggle.bind(this);
    this.close = this.close.bind(this);
  }

  setToggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  close() {
    this.setState({
      toggle: false
    });
  }

  render() {
    return (
      <div className="container" >
        <nav className="navbar" >
          <h1 className="logo">GG👾</h1>
          {
            this.state.toggle ? <SearchBar toggle={this.state.close} /> : false
          }

          <ul className="desktopView">
            <li><a onClick={this.setToggle}><span className="iconify search-button" data-icon="el:search-alt" data-inline="false"></span></a></li>
            <li><a href="#"><span className="iconify" data-icon="ant-design:home-filled" data-inline="false"></span> </a></li>
            <li><a href=""><span className="iconify" data-icon="eva:message-square-fill" data-inline="false"></span></a></li>
            <li><a href="#userProfile"><span className="iconify" data-icon="ic:round-account-circle" data-inline="false"></span></a></li>
          </ul>
          <a href="#newpost"><span className="iconify postBtn" data-icon="bi:plus-square-dotted" data-inline="false"></span></a>
          <ul className="mobileView">
            <li><a onClick={this.setToggle}><span className="iconify" data-icon="el:search-alt" data-inline="false"></span></a></li>
            <li><a href="#"><span className="iconify" data-icon="ant-design:home-filled" data-inline="false"></span> </a></li>
            <li><a href=""><span className="iconify" data-icon="eva:message-square-fill" data-inline="false"></span></a></li>
            <li><a href="#userProfile"><span className="iconify" data-icon="ic:round-account-circle" data-inline="false"></span></a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
