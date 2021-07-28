import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch('/api/feed')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <>
      <h1 className="feed-header"> Feed</h1>
      <ul className="feed">
        {
          posts.reverse().map(post => (
        <li key={post.postId} className="posting">
          <h4 className="gamerTag">{post.gamerTag}</h4>
          <img src={post.photo} alt="" className="userPostImg"/>
          <h4 className="description">{post.gamerTag}: {post.description}</h4>
        </li>
          ))
        }
      </ul>
      </>
    );
  }
}
