import React from 'react';
import Home from './pages/home';
import Navbar from './components/navBar';
import Profile from './pages/profilePage';
import Profiles from './pages/profiles';
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
    const audio = new Audio('/easteregg/contra.mp3');
    const pressed = [];
    const code = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';

    window.addEventListener('keyup', e => {
      pressed.push(e.key);
      pressed.splice(-code.length - 1, pressed.length - code.length);
      if (pressed.join('').includes(code)) {
        audio.play();

      }
    });

    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'newpost') {
      return <PostForm />;
    }
    if (route.path === 'userProfile') {
      return <Profile />;
    }
    if (route.path === 'profile') {
      const userId = route.params.get('userId');
      return <Profiles userId={userId}/>;
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
