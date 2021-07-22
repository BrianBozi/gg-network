import React from 'react';

class Navbar extends React.Component {

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <h1 className="logo">GG👾</h1>
          <ul className="desktopView">
            <li><a href=""><span className="iconify" data-icon="el:search-alt" data-inline="false"></span></a></li>
            {/* <li><a href=""><span className="iconify" data-icon="bi:plus-square-dotted" data-inline="false"></span></a></li> */}
            <li><a href=""><span className="iconify" data-icon="ant-design:home-filled" data-inline="false"></span> </a></li>
            <li><a href=""><span className="iconify" data-icon="eva:message-square-fill" data-inline="false"></span></a></li>
            <li><a href=""><span className="iconify" data-icon="ic:round-account-circle" data-inline="false"></span></a></li>
          </ul>
          <a href=""><span className="iconify postBtn" data-icon="bi:plus-square-dotted" data-inline="false"></span></a>
          <ul className="mobileView">
            <li><a href=""><span className="iconify" data-icon="el:search-alt" data-inline="false"></span></a></li>
            <li><a href=""><span className="iconify" data-icon="ant-design:home-filled" data-inline="false"></span> </a></li>
            <li><a href=""><span className="iconify" data-icon="eva:message-square-fill" data-inline="false"></span></a></li>
            <li><a href=""><span className="iconify" data-icon="ic:round-account-circle" data-inline="false"></span></a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
