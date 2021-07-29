import React from 'react';

export default class Profiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(`api/profile/${this.props.userId}`)
      .then(res => res.json())
      .then(posts => this.setState({ posts: posts }));
  }

  render() {
    const { posts } = this.state;

    return (
    <div>
        <div className="profileContainer">
          <div className="user">
            <div className="row">
              <img src="images/image-1627260855488.jpeg" alt="" className="userImage" />
            </div>
            <div className="row userName">
              <h2>{(!this.state.posts.length) ? 'Loading...' : this.state.posts[0].gamerTag}</h2>
            </div>
            <ul className="userAccFeed">
              {
                posts.reverse().map(post => (
                  <li key={post.postId} className="accPost" id={post.postId} onClick={this.clickedOn} >
                    <div className="row" >
                    </div>
                    <img src={post.photo} alt="" className="userPostImg" onClick={() => this.setActive(post)} id={post.postId} />
                    <p className="description">{post.description}  {post.postId}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
    </div>
    );
  }

}
