import React from 'react';

export default class Profile extends React.Component {
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
    fetch('/api/feed/profile')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  render() {

    const { posts } = this.state;
    // console.log('Post at 0', posts[0]);

    // if (!this.state.posts.length) {
    //   return <h2>yup were waiting</h2>;
    // } else {
    //   return <h2>{this.state.posts[0].gamerTag}</h2>;
    // }

    return (
      <div className="profileContainer">
      <div className="user">
        <div className="row">
          <img src="/images/boruto.jpeg" alt="" className="userImage" />
        </div>
        <div className="row userName">
            <h2>{(!this.state.posts.length) ? 'Loading...' : this.state.posts[0].gamerTag}</h2>
          </div>
          <ul className="userAccFeed">
            {
              posts.reverse().map(post => (
                <li key={post.postId} className="accPost">
                  <img src={post.photo} alt="" className="userPostImg" />
                  <p className="description">{post.description}</p>
                </li>
              ))
            }
          </ul>
        </div>
        </div>
    );
  }
}
