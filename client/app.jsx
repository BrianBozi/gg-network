import React from 'react';
import Home from './pages/home';
import Navbar from './components/navBar';
import PostForm from './pages/postForm';
import parseRoute from './lib/parse-route.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.onhashchange = e => {
      const newView = parseRoute(window.location.hash);
      this.setState({ route: newView });
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'newpost') {
      return <PostForm />;
    }
  }

  render() {
    return (
    <>
    <Navbar />
    { this.renderPage() }
    </>
    );
  }
}
