import React from 'react';

export default class Profiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch(`api/profile/${this.props.userId}`)
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts: posts
        });
      });
  }

  render() {
    this.getPosts();

    const { posts } = this.state;

    return (
    <div>
        <div className="profile-container">
          <div className="user">
            <div className="row">
              <img src="images/boruto.jpeg" alt="" className="user-image" />
            </div>
            <div className="row user-name">
              <h2>{(!this.state.posts.length) ? 'Loading...' : this.state.posts[0].gamerTag}</h2>
            </div>
            <ul className="user-acc-feed">
              {
                posts.reverse().map(post => (
                  <li key={post.postId} className="acc-post" id={post.postId} onClick={this.clickedOn} >
                    <div className="row" >
                    </div>
                    <img src={post.photo} alt="" className="user-post-img" onClick={() => this.setActive(post)} id={post.postId} />
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
