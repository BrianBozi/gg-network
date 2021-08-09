import React from 'react';
import Modal from '../components/postModal';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      activeItem: null,
      modalOn: false
    };
    this.modalAccept = this.modalAccept.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.getPosts = this.getPosts.bind(this);

  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch('/api/feed/profile')
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts: posts,
          items: posts
        });
      });
  }

  setActive(item) {
    this.setState({
      activeItem: item,
      modalOn: true
    });
  }

  modalClose() {
    this.setActive(null);
  }

  modalAccept() {
    this.setActive(null);
  }

  render() {
    const { posts } = this.state;

    return (
      <>
      <div className="profileContainer">
      <div className="user">
        <div className="row">
          <img src="images/snake.jpeg" alt="" className="userImage" />
        </div>
        <div className="row userName">
            <h2>{(!this.state.posts.length) ? 'Loading...' : this.state.posts[0].gamerTag}</h2>
          </div>
          <ul className="userAccFeed">
            {
              posts.map(post => (
                <li key={post.postId} className="accPost" id={post.postId} onClick={this.clickedOn} >
                  <div className="row" >
                    <span className="iconify editBtn" data-icon="akar-icons:edit" data-inline="false" id={post.postId} ></span>
                    </div>
                  <img src={post.photo} alt="" className="userPostImg" onClick={() => this.setActive(post)} id={post.postId} />
                  <p className="description">{post.description}</p>
                </li>
              ))
            }
          </ul>
        </div>
        </div>
        <Modal active={this.state.activeItem} accept={this.modalAccept} close={() => this.modalClose()} getPosts={this.getPosts} />
        </>
    );
  }
}
