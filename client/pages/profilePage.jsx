import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPosts: []
    };

  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch('/api/feed/profile')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  render() {
    // const { posts } = this.state;
    // console.log('posts', posts);

    return (
      <div className="profileContainer">
      <div className="user">
        <div className="row">
          <img src="" alt="" />
        </div>
        <div className="row">
          <h2></h2>
          </div>
          <ul>
          </ul>
        </div>
        </div>
    );
  }
}
