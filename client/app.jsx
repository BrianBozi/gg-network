import React from 'react';
import Home from './pages/home';
import Navbar from './components/navBar';

export default class App extends React.Component {
  render() {
    return (
    <>
    <Navbar />
    <Home />
    </>
    );
  }
}
